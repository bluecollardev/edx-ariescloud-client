import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-relationships',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Manage Relationships</ion-title>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./relationships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
