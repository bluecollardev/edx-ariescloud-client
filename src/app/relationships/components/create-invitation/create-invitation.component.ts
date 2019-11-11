import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import {
  HttpService,
  IInvitationResult
} from 'src/app/core/services/http.service';
import { Observable } from 'rxjs';

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
        <ion-buttons
          slot="end"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Copy Invitation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col >
            <form [formGroup]="fg">
              <ion-list
                lines="full"
                class="ion-no-margin ion-no-padding"
                *ngIf="invite$ | async as invitation"
              >
                <ion-card>
                  <ion-card-header>Invitation </ion-card-header>
                  <ion-card-content>{{ invitation | json }}</ion-card-content>
                </ion-card>
                <!--
                <ion-item>
                  <ion-label position="stacked"
                    >First Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input
                    required
                    type="text"
                    formControlName="firstName"
                  ></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked"
                    >Last Name
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input
                    required
                    type="text"
                    formControlName="lastName"
                  ></ion-input>
                </ion-item>
-->
              </ion-list>
              <div
                class="ion-padding"
                style="display: flex; justify-content: space-around"
              >
                <ion-button
                  style="flex: 1"
                  color="light"
                  (click)="this.router.navigate(['/relationships'])"
                  class="ion-no-margin"
                >
                  <ion-icon name="close"></ion-icon>
                  Close
                </ion-button>
                <!--  <ion-button
                  style="flex: 1; margin-left: 1rem"
                  (click)="submit(fg)"
                  class="ion-no-margin">
                  <ion-icon name="save"></ion-icon>
                  Save Profile
                </ion-button>
                -->
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./create-invitation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInvitationComponent implements OnInit {
  fg: FormGroup;
  valid = false;
  invite$: Observable<IInvitationResult>;
  constructor(
    public router: Router,
    // private actionSvc: ProfileActionsService,
    private httpSvc: HttpService
  ) {}

  ngOnInit() {
    const fg = new FormGroup({
      orgName: new FormControl('', [Validators.required]), // TODO: Required only if issuing
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    });

    this.fg = fg;

    fg.valueChanges.subscribe(obs => console.log(obs));
    this.invite$ = this.httpSvc.get<IInvitationResult>('invitations');
  }

  /*submit(fg: FormGroup) {
    const profile = fg.value;
    fg.valid
      ? (console.log('valid'), this.sendProfile(profile))
      : console.log('invalid', (this.valid = false));

    // re-direct url of some kind
    this.router.navigate(['/profile']);
  }*/

  /*sendProfile(profile: IProfile) {
    console.log(profile);
    this.actionSvc.submitProfile(profile);
  }*/
}
