import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { CredentialStateService, ICredentialDef } from './services/credential-state.service';
import { CredentialActionsService } from './services/credential-actions.service';

@Component({
  selector: 'app-credentials',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Manage Credential Types</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>

            <ion-grid style="width: 100%;">
              <ion-row>
                <ion-col>
                  <ion-list-header>
                    <ion-label>My Organization's Credential Types</ion-label>
                  </ion-list-header>
                </ion-col>
              </ion-row>
              <ion-row *ngIf="credentialDefs | async as credDefs">
                <ion-col
                  *ngFor="let credDef of credDefs"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2">
                  <ion-card text-center (click)="presentActionSheet()">
                    <ion-card-header></ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      <small><strong>{{ credDef.name }}</strong></small>
                      <br />
                      <small>{{ credDef.program }}</small>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>

            <div style="display: flex">
              <ion-button
                style="flex: 1"
                color="primary"
                clear
                full
                icon-start
                margin
                [routerLink]="['create']">
                <ion-icon name="add"></ion-icon>
                Create New Credential Type
              </ion-button>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsComponent implements OnInit {
  searchQuery: '';
  credentialDefs: Observable<ICredentialDef[]>;

  constructor(
    private router: Router,
    private stateSvc: CredentialStateService,
    private actionSvc: CredentialActionsService,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.initializeItems();
  }

  ngOnInit() {
    this.stateSvc.ready.subscribe(bool => {
      console.log('bool', bool);
      if (bool) {
        this.credentialDefs = this.stateSvc.credentialDefs$;
        this.credentialDefs.subscribe(obs => console.log(obs));
      }
    });
  }

  async initializeItems() {
    await this.actionSvc.loadCredDefs();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      /*this.credentialDefs = this.credentialDefs.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });*/
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'View',
          handler: () => this.router.navigate(['/credentials/view'])
        },
        {
          text: 'Edit',
          handler: () => this.router.navigate(['/credentials/edit'])
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }
}
