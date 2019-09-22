import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-profile',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">My Profile</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form onsubmit="processForm(event)">
        <ion-list lines="full" class="ion-no-margin ion-no-padding">
          <ion-item>
            <ion-label position="stacked">First Name <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" oninput="handleFirstNameValue(event)">Alice</ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Last Name <ion-text color="danger">*</ion-text></ion-label>
            <ion-input required type="text" oninput="handleLastNameValue(event)">Cooper</ion-input>
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
          <ion-button expand="block" type="submit" class="ion-no-margin">Update Account</ion-button>
        </div>
      </form>

      <ion-router-outlet></ion-router-outlet>
    </ion-content>
  `,
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
