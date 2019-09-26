import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-relationship',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">View Relationship</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center [routerLink]="['view']">
              <img src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"/>
              <ion-card-content>
                <ion-card-title>
                  Faber University
                </ion-card-title>
                <small><small>Their ID: 123-45-6789</small></small>
                <br />
                <small><small>My DID: acbd-123-sdf-2345</small></small>
              </ion-card-content>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Date Connected</ion-label>
                <ion-badge item-end>{{ graduationDate }}</ion-badge>
              </ion-item>
              
              <ion-item class="flex ion-justify-content-around">
                <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                <ion-label>Status</ion-label>
                <ion-badge item-end>Enabled</ion-badge>
              </ion-item>
              
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="close-circle"></ion-icon>
                  Disable
                </ion-button>
                <ion-button
                  style="flex: 1"
                  color="secondary"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="trash"></ion-icon>
                  Remove
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-relationship.component.scss']
})
export class ViewRelationshipComponent implements OnInit {
  graduationDate: string = new Date().toDateString()

  constructor() { }

  ngOnInit() {
  }

}
