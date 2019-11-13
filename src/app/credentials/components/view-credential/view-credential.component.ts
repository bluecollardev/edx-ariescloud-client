import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredential,
} from '../../../credentials/services/credential-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';
import { HttpService } from 'src/app/core/services/http.service';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-view-credential',
  template: `
    <app-item-header
      title="My Credential"
      default="/credentials/received"
    ></app-item-header>
    <ion-content *ngIf="active$ | async as cred" color="light">
      <ion-card text-center>
        <ion-toolbar color="primary">
          <ion-title>Received Credential</ion-title>
        </ion-toolbar>
        <ion-list>
          <ion-list-header>
            <h2>
              Attributes
            </h2>
          </ion-list-header>
          <ion-item *ngFor="let attr of cred.attrs">
            <ion-label>{{ attr.key }}</ion-label>
            <ion-badge color="secondary" item-end>{{ attr.val }}</ion-badge>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">
              Credential Referent
            </ion-label>
            <ion-note>
              {{ cred.referent }}
            </ion-note>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">
              Credential Definition Id
            </ion-label>
            <ion-note>
              {{ cred.cred_def_id }}
            </ion-note>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">
              Schema Id
            </ion-label>
            <ion-note>
              {{ cred.schema_id }}
            </ion-note>
          </ion-item>
        </ion-list>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-credential.component.scss'],
})
export class ViewCredentialComponent implements OnInit {
  active$: Observable<ICredential>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    private alertController: AlertController,
    private httpSvc: HttpService,
  ) {
    // this.setActiveCred();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const getKeys = (attrs: { [key: string]: string }[]) => Object.keys(attrs);
    const mapKeys = (key: string) => ({ key });
    const mapVals = (val: string) => ({ val });

    // const map = (arr: string[]) => {}

    console.log('the id', id);
    this.active$ = this.httpSvc
      .getById<ICredential>(
        'credentials',
        this.route.snapshot.paramMap.get('id'),
      )
      .pipe(
        map(cred => {
          const { attrs, ...noattrs } = cred;
          return {
            attrs: getKeys(attrs).map(key => ({
              ...mapKeys(key),
              ...mapVals(attrs[key]),
            })),
            ...noattrs,
          };
        }),
        tap(obs => console.log(obs)),
      );
  }

  async getKeys(attr: any) {
    let val = Object.keys(attr)[0];
    console.log('val');
    return val;
  }

  async shareCredPopup() {
    const alert = await this.alertController.create({
      header: 'Share Credential',
      message: 'Please choose a relationship to share this credential with.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'ACME Inc.',
          value: 'value1',
          checked: false,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.selectDataPopup();
          },
        },
      ],
    });

    await alert.present();
  }

  async selectDataPopup() {
    const alert = await this.alertController.create({
      header: 'Select Data',
      message: 'Please select what information you want to share.',
      inputs: [
        {
          name: 'checkbox1',
          type: 'checkbox',
          label: 'Degree',
          value: 'value1',
          checked: false,
        },
        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Program',
          value: 'value2',
          checked: false,
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Date of Study',
          value: 'value3',
          checked: false,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.credSharedPopup();
          },
        },
      ],
    });

    await alert.present();
  }

  async credSharedPopup() {
    const alert = await this.alertController.create({
      header: 'Credential Shared',
      message: 'Success! Your credential was shared with ACME Inc.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });

    await alert.present();
  }
  action() {
    console.log('clicked');
  }
}
