import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CredentialStateService,
  ICredential
} from '../../../credentials/services/credential-state.service';
import { CredentialActionsService } from '../../../credentials/services/credential-actions.service';
import { HttpService } from 'src/app/core/services/http.service';

// import { ICredentialResponse } from '../../models/i-credential';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="end"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Credential</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content *ngIf="active$ | async as active">
      <ion-grid>
        <ion-row>
          <ion-col >
            <ion-card text-center>
              <img
                src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"
              />

              <ion-card-content>
                <ion-card-title>
                  {{ active.name }}
                  <br />
                  <div style="text-align: left; max-width: 60%; margin: 0 auto">
                    <small
                      ><small
                        ><small>Issued by:</small> {{ active.label }}</small
                      ></small
                    >
                    <!--<br />
                    <small><small><small>Issued to:</small> Alice Cooper</small></small>-->
                  </div>
                </ion-card-title>
              </ion-card-content>
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Issued</ion-label>
                <ion-badge color="medium" item-end>{{
                  active.updated
                }}</ion-badge>
              </ion-item>
              <ng-container *ngFor="let itm of active.values">
                <ion-item class="flex ion-justify-content-around">
                  <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                  <ion-label>{{ itm.key }}</ion-label>
                  <ion-badge color="medium" item-end>{{ itm.value }}</ion-badge>
                </ion-item>
              </ng-container>
              <!--
              <ion-item class="flex ion-justify-content-around">
                <ion-label>Program</ion-label>
                <ion-badge color="medium" item-end>{{
                  active.program
                }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <ion-label>GPA</ion-label>
                <ion-badge color="medium" item-end>3.8 / 4.0</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <ion-label>Status</ion-label>
                <ion-badge color="medium" item-end>{{
                  active.status
                }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <ion-label>SSN</ion-label>
                <ion-badge color="medium" item-end>abcd-1234-xyz</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <ion-label>Document Version</ion-label>
                <ion-badge color="medium" item-end>{{
                  active.version
                }}</ion-badge>
              </ion-item>
-->
              <div style="display: flex; flex-direction: column">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  (click)="this.shareCredPopup()"
                >
                  <ion-icon name="share"></ion-icon>
                  Share Credential
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-credential.component.scss']
})
export class ViewCredentialComponent implements OnInit {
  active$: Observable<ICredential>;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    private alertController: AlertController,
    private httpSvc: HttpService
  ) {
    // this.setActiveCred();
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('the id', id);
    this.active$ = this.httpSvc.getById(
      'credentials',
      this.route.snapshot.paramMap.get('id')
    );
    this.active$.subscribe(obs => console.log(obs));
  }

  async setActiveCred() {
    // this.stateSvc.activeCredential$.pipe(
    //   map(is => {
    //     return is.filter((i) => i.id === this.route.snapshot.paramMap.get('id'))[0];
    //   })
    // ).subscribe((credential) => {
    //   this.active = credential;
    // });
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
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.selectDataPopup();
          }
        }
      ]
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
          checked: false
        },
        {
          name: 'checkbox2',
          type: 'checkbox',
          label: 'Program',
          value: 'value2',
          checked: false
        },
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: 'Date of Study',
          value: 'value3',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
            this.credSharedPopup();
          }
        }
      ]
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
          }
        }
      ]
    });

    await alert.present();
  }
}
