import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICredentialDef } from '../services/credential-state.service';
import { CredentialActionsService } from '../services/credential-actions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RelationshipsActionService } from 'src/app/relationships/services/relationships-action.service';
import { IRelationship } from 'src/app/messages/services/messages-state.service';
import { tap, map } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-issue-credential',
  template: `
    <ion-header
      role="banner"
      class="ios header-ios hydrated"
      *ngIf="credDef$ | async as credDef"
    >
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated"
          >Issue "{{ credDef.name }}"</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form [formGroup]="fg">
        <ion-grid>
          <ion-row>
            <ion-col>
              <ion-item>
                <ion-label position="stacked"
                  >Issue To:
                  <ion-text color="danger">*</ion-text>
                </ion-label>
                <ion-select
                  required
                  formControlName="connectionId"
                  *ngIf="relationship$ | async as relationships"
                >
                  <ion-select-option
                    *ngFor="let relationship of relationships"
                    [value]="relationship._id"
                    >{{ relationship.name }}</ion-select-option
                  >
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
  styleUrls: ['./issue-credential.component.scss']
})
export class IssueCredentialComponent implements OnInit {
  credDef$: Observable<ICredentialDef>;
  credDefId: string;
  fg: FormGroup;
  fa$: Observable<FormArray>;
  relationship$: Observable<IRelationship[]>;
  constructor(
    private actionSvc: CredentialActionsService,
    private relationshipsActionSvc: RelationshipsActionService,
    private Route: ActivatedRoute,
    private router: Router,
    private httpSvc: HttpService,
    public loadingController: LoadingController
  ) {
    this.fg = new FormGroup({
      connectionId: new FormControl(''),
      comment: new FormControl('')
    });
  }

  ngOnInit() {
    const id = this.Route.snapshot.paramMap.get('id');
    this.credDef$ = this.actionSvc.getCredentialDef(id).pipe(
      tap(obs => (this.credDefId = obs._id)),
      tap(obs => {
        const fa = new FormArray([]);
        obs.attributes.forEach(val =>
          fa.push(
            new FormGroup({
              name: new FormControl(val),
              value: new FormControl('')
            })
          )
        );
        this.fa$ = of(fa);
      })
    );
    this.relationship$ = this.relationshipsActionSvc
      .getRelationships()
      .pipe(map(obs => obs.filter(itm => itm.state === 'active')));

    this.credDef$.subscribe(obs => console.log(obs));
  }

  async submit() {
    const loading = await this.loadingController.create({
      message: 'Submitting the credential',
      duration: 10000
    });
    await loading.present();
    const fa = await this.fa$.toPromise();

    const ret = {
      connectionId: this.fg.value.connectionId,
      credDefId: this.credDefId,
      comment: this.fg.value.comment,
      attrs: fa.value
    };
    console.log(ret);
    try {
      const res = await this.httpSvc.post('issues', ret).toPromise();
      if (res) {
        console.log('result', res);
        await this.loadingController.dismiss();
        this.router.navigate(['/credentials']);
      }
    } catch (err) {
      this.loadingController.dismiss();
    }
  }
}
