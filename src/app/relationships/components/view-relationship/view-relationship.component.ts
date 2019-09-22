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
  `,
  styleUrls: ['./view-relationship.component.scss']
})
export class ViewRelationshipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
