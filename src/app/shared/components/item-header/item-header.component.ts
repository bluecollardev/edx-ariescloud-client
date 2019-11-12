import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-header',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-back-button [defaultHref]="default"></ion-back-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./item-header.component.css'],
})
export class ItemHeaderComponent implements OnInit {
  @Input() default = '/';
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
