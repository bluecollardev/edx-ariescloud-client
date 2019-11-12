import { Component, OnInit, OnDestroy } from '@angular/core';
import { RelationshipsStateService } from '../../services/relationships-state.service';
import { RelationshipsActionService } from '../../services/relationships-action.service';
import { Observable } from 'rxjs';
import { IInvitation } from '../../models/i-invitation';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-relationship',
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
        <ion-title class="ios title-ios hydrated"
          >Enter Invitation Code</ion-title
        >
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <br />
      <br />
      <!--<ion-grid *ngIf="invitation$ | async as invite">-->
      <ion-grid>
        <ion-row>
          <ion-col>
            <form [formGroup]="fg">
              <ion-list lines="full" class="ion-no-margin ion-no-padding">
                <ion-item>
                  <ion-label position="stacked"
                    >Invitation
                    <ion-text color="danger">*</ion-text>
                  </ion-label>
                  <ion-input
                    required
                    type="text"
                    formControlName="invite"
                  ></ion-input>
                </ion-item>
                <!--
                <ion-item>
                  <ion-label position="stacked">Notes</ion-label>
                  <ion-textarea></ion-textarea>
                </ion-item>
                -->
              </ion-list>

              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="primary"
                  clear
                  full
                  icon-start
                  margin
                  (click)="submit(fg.controls['invite'].value)"
                >
                  <ion-icon name="checkmark"></ion-icon>
                  OK
                </ion-button>
              </div>
            </form>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./add-relationship.component.scss'],
})
export class AddRelationshipComponent implements OnInit, OnDestroy {
  invitation$: Observable<IInvitation>;
  fc: FormControl;
  fg: FormGroup;
  constructor(
    private stateSvc: RelationshipsStateService,
    private actionSvc: RelationshipsActionService,
    private router: Router,
    public loadingController: LoadingController,
  ) {}

  ngOnInit() {
    const fc = new FormControl('', [Validators.minLength(10)]);
    this.fg = new FormGroup({ invite: fc });
  }

  async ngOnDestroy() {
    return await this.actionSvc.resetRelState();
  }

  async submit(fc: any) {
    const loading = await this.loadingController.create({
      message: 'Accepting Invitation',
      duration: 10000,
    });
    await loading.present();
    try {
      const invite = JSON.parse(fc);
      const res = await this.actionSvc.acceptInvitation(invite);
      if (!res) {
        return await this.actionSvc.resetRelState();
      }
      await this.actionSvc.resetRelState();
      setTimeout(() => {
        this.actionSvc.resetRelState().then(() => {
          loading.dismiss();
          this.router.navigate(['/relationships']);
        });
      }, 4000);
    } catch (err) {}
  }
}
// [routerLink]="['/relationships']"
