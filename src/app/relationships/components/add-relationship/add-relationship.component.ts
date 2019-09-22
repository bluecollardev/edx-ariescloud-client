import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-relationship',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Request Access to Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <form onsubmit="processForm(event)">
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked">Org. Name <ion-text color="danger">*</ion-text></ion-label>
                  <ion-input required type="text" oninput="handleFirstNameValue(event)">ACME Inc.</ion-input>
                </ion-item>
      
                <ion-item>
                  <ion-label position="stacked">Their Endpoint DID <ion-text color="danger">*</ion-text></ion-label>
                  <ion-input required type="text" oninput="handleLastNameValue(event)"></ion-input>
                </ion-item>
      
                <!--<ion-item>
                  <ion-label position="stacked">Address</ion-label>
                  <ion-input placeholder="Address Line 1"></ion-input>
                  <ion-input placeholder="Address Line 2"></ion-input>
                  <ion-input placeholder="City"></ion-input>
                  <ion-input placeholder="State"></ion-input>
                  <ion-input placeholder="Zip Code"></ion-input>
                </ion-item>-->
      
                <ion-item>
                  <ion-label position="stacked">Notes</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
              </ion-list>
      
              <div class="ion-padding">
                <ion-button expand="block" type="submit" class="ion-no-margin">Request Access</ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./add-relationship.component.scss']
})
export class AddRelationshipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
