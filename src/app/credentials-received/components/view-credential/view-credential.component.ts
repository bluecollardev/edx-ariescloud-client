import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Credential</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center>
              <img src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"/>

              <ion-card-content>
                <ion-card-title>
                  Bachelor's of Science
                  <br />
                  <div style="text-align: left; max-width: 60%; margin: 0 auto">
                    <small><small><small>Issued by:</small> Faber University</small></small>
                    <!--<br />
                    <small><small><small>Issued to:</small> Alice Cooper</small></small>-->
                  </div>
                </ion-card-title>
              </ion-card-content>
              <ion-card-content>
                <p>
                  <strong>Alice Cooper</strong> is a verified graduate of Faber University.
                </p>
              </ion-card-content>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Issued</ion-label>
                <ion-badge item-end>{{ graduationDate }}</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Degree</ion-label>
                <ion-badge item-end>Bachelor's of Science</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Program</ion-label>
                <ion-badge item-end>Computer Science</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>GPA</ion-label>
                <ion-badge item-end>3.8 / 4.0</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Status</ion-label>
                <ion-badge item-end>Graduated</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>SSN</ion-label>
                <ion-badge item-end>abcd-1234-xyz</ion-badge>
              </ion-item>

              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Document Version</ion-label>
                <ion-badge item-end>1.3</ion-badge>
              </ion-item>

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
  graduationDate: string = new Date().toDateString()

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }

  async shareCredPopup() {
    console.log(arguments);
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
        }, {
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
          text: 'Back',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.router.navigate(['/credentials-received']);
          }
        },
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
