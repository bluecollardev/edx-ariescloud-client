import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Home</ion-title>
      </ion-toolbar>
      <ion-router-outlet id="page-wrapper"></ion-router-outlet>
    </ion-header>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
