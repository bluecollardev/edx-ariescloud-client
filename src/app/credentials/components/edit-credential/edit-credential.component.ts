import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Edit Credential</ion-title>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./edit-credential.component.scss']
})
export class EditCredentialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
