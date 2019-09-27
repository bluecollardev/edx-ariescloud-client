import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { ProfileStateService } from './services/profile-state.service';
import { ProfileActionsService } from './services/profile-actions.service';

export interface IProfile {
  orgName: string;
  firstName: string;
  lastName: string;
}

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
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <ion-card text-center>
              <img src="https://insidelatinamerica.net/wp-content/uploads/2018/01/noImg_2.jpg"/>
              <ion-card-content>
                <ion-card-title>
                  Alice Cooper
                </ion-card-title>
                <small><small>My DID: acbd-123-sdf-2345</small></small>
              </ion-card-content>
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['edit']"
                >
                  <ion-icon name="create"></ion-icon>
                  Edit Profile
                </ion-button>
              </div>
              <ion-list>
                <ion-item-group>
                  <ion-item-divider>
                    <ion-label>Shortcuts</ion-label>
                  </ion-item-divider>
                  <ion-item button class="flex ion-justify-content-around" (click)="this.router.navigate(['/messages/view'])">
                    <ion-label>
                      <h2>Messages</h2>
                    </ion-label>
                    <ion-badge color="primary" item-end>2</ion-badge>
                  </ion-item>
                  <ion-item button class="flex ion-justify-content-around" (click)="this.router.navigate(['/credentials-received'])">
                    <ion-label>
                      <h2>Credentials Received</h2>
                    </ion-label>
                    <ion-badge color="medium" item-end>4</ion-badge>
                  </ion-item>
                  <ion-item button class="flex ion-justify-content-around" (click)="this.router.navigate(['/verify-credentials'])">
                    <ion-label>
                      <h2>Certificates of Proof</h2>
                    </ion-label>
                    <ion-badge color="medium" item-end>2</ion-badge>
                  </ion-item>
                </ion-item-group>
              </ion-list>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  constructor(
    private stateSvc: ProfileStateService,
    private actionSvc: ProfileActionsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
  }
}
