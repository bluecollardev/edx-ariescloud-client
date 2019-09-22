import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-credentials',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Manage Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
    <ion-list *ngFor="let item of items">
      <ion-list-header>
        {{ item }}
      </ion-list-header>
      <ion-item-sliding>
        <ion-item>
          <h2>Sample Credential</h2>
        </ion-item>
        <ion-item-options>
          <button ion-button color="light" icon-start>
            <!--<ion-icon name="ios-more"></ion-icon>-->
            Share
          </button>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>

    <ion-grid>
      <ion-row>
        <ion-col *ngFor="let item of [1,2]">
          <ion-card>
            <ion-card-header>
              ACME Inc.
            </ion-card-header>
            <ion-card-content>
              Transcript 1.3
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>

    <ion-button color="primary" clear full icon-start margin><ion-icon name="add"></ion-icon> Create New Credential</ion-button>
  `,
  styleUrls: ['./credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsComponent implements OnInit {
  searchQuery: '';
  items: string[];

  constructor(public actionSheetCtrl: ActionSheetController) {
    this.initializeItems();
  }

  ngOnInit() {}

  initializeItems() {
    this.items = [
      'Faber University',
      'ACME Inc.'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
