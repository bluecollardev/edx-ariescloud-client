import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `    
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="end" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">EDX Aries Client</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-router-outlet></ion-router-outlet>
    <ion-content>
      <br />
      <br />
      <ion-grid>
        <ion-row>
          <ion-col >
            <ion-list>
              <ion-item>
                <ion-label position="stacked">Username</ion-label>
                <ion-input type="text" value=""></ion-input>
              </ion-item>
              <ion-item>
                <ion-label position="stacked">Password</ion-label>
                <ion-input type="password" value=""></ion-input>
              </ion-item>
            </ion-list>
            <ion-button color="primary" clear full margin [routerLink]="['/relationships']">Sign In</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <!--<ion-button color="primary" clear full margin>Sign In</ion-button>-->
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
