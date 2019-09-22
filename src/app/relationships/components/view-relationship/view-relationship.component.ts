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
      <ion-card text-center [routerLink]="['view']">
        <ion-card-header>
          Faber University
        </ion-card-header>
        <ion-icon name="document" class="icon-lg"></ion-icon>
        <ion-card-content>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['./view-relationship.component.scss']
})
export class ViewRelationshipComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
