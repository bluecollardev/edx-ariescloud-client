import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProofActionService } from '../../services/proof-action.service';
import { tap, mergeMap } from 'rxjs/operators';
import { CredentialActionsService } from 'src/app/credentials/services/credential-actions.service';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-find-creds-card',
  template: `
    <app-item-header
      title="Find Creds to Present"
      default="/verify-credentials"
    ></app-item-header>
    <ng-container *ngIf="creds; else noCreds">
      <ion-content *ngIf="$data | async as data; else loading">
        <ion-list>
          <ng-container *ngFor="let cred of data">
            <ion-item
              (click)="
                present(
                  cred.cred.cred_info.referent,
                  cred.cred.presentation_referents
                )
              "
            >
              <ion-icon slot="start" name="share"> </ion-icon>
              <ion-label>
                <h2>{{ cred.name }}</h2>
                <app-chip
                  *ngFor="let attr of cred.attrs"
                  label="{{ attr.key }} : {{ attr.value }}"
                  icon="cloud-done"
                  color="primary"
                >
                </app-chip>
              </ion-label>
            </ion-item>
          </ng-container>
        </ion-list>
      </ion-content>
    </ng-container>

    <ng-template #loading>
      ...loading
    </ng-template>
    <ng-template #noCreds>
      No credentials in your wallet to match the claim
    </ng-template>
  `,
  styleUrls: ['./find-creds-card.component.css'],
})
export class FindCredsCardComponent implements OnInit {
  id: string;
  creds = true;
  $data: Observable<any[]>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actionSvc: ProofActionService,
    private credActionSvc: CredentialActionsService,
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    try {
      const creds = await this.actionSvc.getProofCred(this.id).toPromise();
      const credDefs = await this.credActionSvc.getCredentialDefs().toPromise();

      const mapped = creds.map(cred => {
        const credDef = credDefs.filter(
          def =>
            cred.cred_info.cred_def_id ===
            def._id.slice(def._id.indexOf('_') + 1),
        )[0];
        const attrs = Object.entries(cred.cred_info.attrs).map(pair => ({
          key: pair[0],
          value: pair[1],
        }));
        console.log(attrs);
        return {
          name: credDef.name,
          cred,
          attrs,
        };
      });
      this.$data = of(mapped);
      console.log(mapped);
    } catch {
      this.creds = false;
    }
  }

  async present(id: string, refs: string[]) {
    const presentation = new Presentation(refs, id);

    const presReq = presentation.values;

    const res = await this.actionSvc
      .postProofById(presReq, this.id)
      .toPromise();

    if (res)
      return this.router.navigate(['/verify-credentials/view/' + this.id]);
  }
}

class Presentation {
  requested_attributes: any;
  self_attested_attributes: any;
  requested_predicates: any;

  get values() {
    return {
      requested_attributes: this.requested_attributes,
      self_attested_attributes: this.self_attested_attributes,
      requested_predicates: this.requested_predicates,
    };
  }

  constructor(arr: string[], credId) {
    this.self_attested_attributes = {};
    this.requested_attributes = {};
    this.requested_predicates = {};
    arr.map(
      itm =>
        (this.requested_attributes[itm] = { cred_id: credId, revealed: true }),
    );

    console.log(this);
  }
}

/*
{
  "requested_predicates": {},
  "self_attested_attributes": {},
  "requested_attributes": {
    "a6da4dd0-053d-11ea-81dd-3f7df9f98e17": {
      "revealed": true,
      "cred_id": "a6da4dd0-053d-11ea-81dd-3f7df9f98e17"
    },
 }
}

{
  "requested_attributes": {
    "additionalProp1": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "revealed": true
    },
    "additionalProp2": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "revealed": true
    },
    "additionalProp3": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "revealed": true
    }
  },
  "self_attested_attributes": {
    "additionalProp1": "self_attested_value",
    "additionalProp2": "self_attested_value",
    "additionalProp3": "self_attested_value"
  },
  "requested_predicates": {
    "additionalProp1": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "additionalProp2": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    },
    "additionalProp3": {
      "cred_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  }
}
*/
export interface ProverCred {
  cred_info: CredInfo;
  interval: Interval;
  presentation_referents?: string[] | null;
}
export interface CredInfo {
  referent: string;
  attrs: Attrs;
  schema_id: string;
  cred_def_id: string;
  rev_reg_id?: null;
  cred_rev_id?: null;
}
export interface Attrs {
  data: string;
}
export interface Interval {
  from?: null;
  to?: null;
}
