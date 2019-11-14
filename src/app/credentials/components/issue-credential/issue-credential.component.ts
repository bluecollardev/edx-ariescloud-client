import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  ICredentialDef,
  ICredential,
} from '../../services/credential-state.service';
import { CredentialActionsService } from '../../services/credential-actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RelationshipsActionService } from 'src/app/relationships/services/relationships-action.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { tap, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';

import { filter } from 'rxjs/operators';
import { MessagesService } from 'src/app/core/services/messages.service';

@Component({
  selector: 'app-issue-credential',
  template: `
    <app-item-header title="Issue Credential" default="/issuer">
    </app-item-header>
    <ion-content>
      <form [formGroup]="fg" *ngIf="credDef$ | async as credDef">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked"
                  >Issue To
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-select
                  required
                  formControlName="connectionId"
                  *ngIf="relationships$ | async as relationships"
                >
                  <ng-container *ngFor="let relationship of relationships">
                    <ion-select-option
                      *ngIf="isSelectedRelationship(relationship._id)"
                      [value]="relationship._id"
                      selected
                    >
                      {{ relationship.name }}
                    </ion-select-option>

                    <ion-select-option
                      *ngIf="!isSelectedRelationship(relationship._id)"
                      [value]="relationship._id"
                    >
                      {{ relationship.name }}
                    </ion-select-option>
                  </ng-container>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ng-container *ngIf="fa$ | async as fa">
            <ion-row *ngFor="let vfg of fa.controls">
              <ion-col>
                <ion-item
                  ><ion-label position="stacked"
                    >{{ vfg.value.name }}
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input [formControl]="vfg.controls.value"></ion-input>
                </ion-item>
              </ion-col>
            </ion-row>
          </ng-container>
          <ion-row>
            <ion-col>
              <ion-item
                ><ion-label position="stacked"
                  >Comment
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-input formControlName="comment"></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div style="display: flex">
          <ion-button
            style="flex: 1"
            color="primary"
            clear
            full
            icon-start
            margin
            (click)="submit()"
          >
            <ion-icon name="checkmark"></ion-icon>
            Issue Credential(s)
          </ion-button>
        </div>
      </form>
    </ion-content>
  `,
  styleUrls: ['./issue-credential.component.scss'],
})
export class IssueCredentialComponent implements OnInit {
  activeTab: string;
  credDef$: Observable<ICredentialDef>;
  credDefId: string;
  fg: FormGroup;
  fa$: Observable<FormArray>;
  relationships$: Observable<IRelationship[]>;
  relationshipId: string;

  validStates = ['to'];

  constructor(
    private actionSvc: CredentialActionsService,
    private relationshipsActionSvc: RelationshipsActionService,
    private route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpService,
    public loadingController: LoadingController,
    private mssg: MessagesService,
  ) {
    this.fg = new FormGroup({
      connectionId: new FormControl(''),
      comment: new FormControl(''),
    });
  }
  selectRel(evt) {
    console.log(evt);
    this.relationships$ = evt;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.credDef$ = this.actionSvc.getCredentialDef(id).pipe(
      tap(obs => (console.log(obs), (this.credDefId = obs._id))),
      tap(obs => {
        const fa = new FormArray([]);
        console.log(obs);
        obs.attributes.forEach(val =>
          fa.push(
            new FormGroup({
              name: new FormControl(val),
              value: new FormControl(''),
            }),
          ),
        );
        this.fa$ = of(fa);
      }),
    );

    this.relationships$ = this.relationshipsActionSvc
      .getRelationships() // TODO: Fix this hack!
      .pipe(
        map(obs =>
          obs.filter(itm => {
            return itm.state === 'active';
          }),
        ),
      );
    // .pipe(map(obs => obs.filter(itm => itm.state === 'active')));

    this.route.queryParams.subscribe(params => {
      this.relationshipId = params.rId;
      console.log('relationship id to match');
      console.log(this.relationshipId);
      this.fg.get('connectionId').setValue(this.relationshipId);
    });
  }

  isSelectedRelationship(rId) {
    // if (rId === this.relationshipId) debugger;
    return rId === this.relationshipId;
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Submitting the credential',
      duration: 10000,
    });
    await loading.present();
    const fa = await this.fa$.toPromise();

    const ret = {
      connectionId: this.fg.value.connectionId,
      credDefId: this.credDefId,
      comment: this.fg.value.comment,
      attrs: fa.value,
    };
    console.log(ret);
    // "attrs": [{"name": "name", "value": "Science"}]
    try {
      const res = await this.httpSvc.post<any>('issues', ret).toPromise();
      if (res._id === 'cdef_undefined') {
        this.mssg.alert({
          message:
            'Something went wrong. Try issuing a new credential definition',
          header: 'Error',
        });
        this.actionSvc.deleteCredDef('cdef_undefined');
      }
      if (res) {
        loading.dismiss();
        this.router.navigate(['/credentials/pending/' + res._id]);
      }
    } catch (err) {
      console.log('error', err);
      this.mssg.alert({
        message:
          'Something went wrong. Try issuing a new credential definition',
        header: 'Error',
      });
      loading.dismiss();
    }
  }
}
