import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-credential',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Preview Credential Type</ion-title>
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
                  <small>Faber University</small>
                </ion-card-title>
                <small><small>Tax ID: 123-45-6789</small></small>
                <br />
                <small><small>DID: acbd-123-sdf-2345</small></small>
              </ion-card-content>
              <ion-card-content>
                <p>
                  Alice is a verified graduate of Faber University.
                </p>
              </ion-card-content>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Issued</ion-label>
                <ion-badge color="medium" item-end>{{ graduationDate }}</ion-badge>
              </ion-item>
          
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Degree</ion-label>
                <ion-badge color="medium" item-end>Bachelor's of Science</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>GPA</ion-label>
                <ion-badge color="medium" item-end>3.8 / 4.0</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Status</ion-label>
                <ion-badge color="medium" item-end>Graduated</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>SSN</ion-label>
                <ion-badge color="medium" item-end>abcd-1234-xyz</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around" lines="none">
                <!--<ion-icon name='musical-notes' item-start style="color: #d03e84"></ion-icon>-->
                <ion-label>Document Version</ion-label>
                <ion-badge color="medium" item-end>1.3</ion-badge>
              </ion-item>
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

  constructor() { }

  ngOnInit() {
  }

}
