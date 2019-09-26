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
      <br/>
      <br/>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="8" pushMd="2" sizeXl="4" pushXl="4">
            <form [formGroup]="fg">
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked">Org. Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input required type="text" formControlName="orgName"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">First Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input required type="text" formControlName="firstName"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Last Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input required type="text" formControlName="lastName"></ion-input>
                </ion-item>

                <!--<ion-item>
                  <ion-label position="stacked">Address</ion-label>
                  <ion-input placeholder="Address Line 1"></ion-input>
                  <ion-input placeholder="Address Line 2"></ion-input>
                  <ion-input placeholder="City"></ion-input>
                  <ion-input placeholder="State"></ion-input>
                  <ion-input placeholder="Zip Code"></ion-input>
                </ion-item>-->
              </ion-list>

              <div class="ion-padding">
                <ion-button
                  expand="block"
                  (click)="submit(fg)"
                  class="ion-no-margin">
                  <ion-icon name="save"></ion-icon>
                  Update Account
                </ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  fg: FormGroup;
  valid = false;

  constructor(
    private stateSvc: ProfileStateService,
    private actionSvc: ProfileActionsService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const fg = new FormGroup({
      orgName: new FormControl('', [Validators.required]), // TODO: Required only if issuing
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.fg = fg;

    fg.valueChanges.subscribe(obs => console.log(obs));
  }

  submit(fg: FormGroup) {
    const profile = fg.value;
    fg.valid
      ? (console.log('valid'), this.sendProfile(profile))
      : console.log('invalid', (this.valid = false));

    // re-direct url of some kind
  }

  sendProfile(profile: IProfile) {
    console.log(profile);
    this.actionSvc.submitProfile(profile);
  }
}
