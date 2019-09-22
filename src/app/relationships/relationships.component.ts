import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

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
    <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
    <ion-list>
      <ion-list-header>
        Pending Approval
      </ion-list-header>
      <ion-item-sliding *ngFor="let item of items.slice(0,1)">
        <ion-item [routerLink]="['view']">
          <ion-icon name="business" class="icon-lg"></ion-icon>
          <ion-label>
            <h2>{{ item }}</h2>
            <small>DID: abcd-1234-df34-cd34</small>
          </ion-label>
        </ion-item>
        <ion-item-options>
          <button ion-button color="light" icon-start>
            <ion-icon name="ios-checkmark" class="icon-md"></ion-icon> Accept
          </button>
          <button ion-button color="primary" icon-start>
            <ion-icon name="ios-close" class="icon-md"></ion-icon> Decline
          </button>
        </ion-item-options>
      </ion-item-sliding>
      <ion-list-header>
        Organizations
      </ion-list-header>
      <ion-item-sliding *ngFor="let item of items.slice(1,2)">
        <ion-item [routerLink]="['view']">
          <ion-icon name="business" class="icon-lg"></ion-icon>
          <ion-label>
            <h2>{{ item }}</h2>
            <small>DID: abcd-1234-df34-cd34</small>
          </ion-label>
        </ion-item>
        <ion-item-options>
          <button ion-button color="light" icon-start>
            <ion-icon name="ios-checkmark" class="icon-md"></ion-icon> Accept
          </button>
          <button ion-button color="primary" icon-start>
            <ion-icon name="ios-close" class="icon-md"></ion-icon> Decline
          </button>
        </ion-item-options>
      </ion-item-sliding>
      <ion-list-header>
        All Contacts
      </ion-list-header>
      <ion-item-sliding *ngFor="let item of items">
        <ion-item [routerLink]="['view']">
          <ion-icon name="person" class="icon-lg"></ion-icon>
          <ion-label>
            <h2>{{ item }}</h2>
            <small>DID: abcd-1234-df34-cd34</small>
          </ion-label>
        </ion-item>
        <ion-item-options>
          <button ion-button color="light" icon-start>
            <ion-icon name="ios-eye-off" class="icon-md"></ion-icon> Disable
          </button>
          <button ion-button color="light" icon-start>
            <ion-icon name="ios-create" class="icon-md"></ion-icon> Edit
          </button>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
    <ion-button color="primary" clear full icon-start margin [routerLink]="['add']"><ion-icon name="add"></ion-icon> Add New Relationship</ion-button>
  `,
  styleUrls: ['./relationships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipsComponent implements OnInit {
  searchQuery: '';
  items: string[];

  constructor(public actionSheetCtrl: ActionSheetController) {
    this.initializeItems();
  }

  ngOnInit() {}

  initializeItems() {
    this.items = [
      'Faber University',
      'ACME Inc.',
      // 'Alice Cooper',
      'Bob Johnson',
      'James Kirk',
      // 'Joanne Roberts',
      // 'Jordan Stewart',
      // 'Nicole Pennington',
      // 'Morgan Wesley',
      // 'George Phillip',
      // 'Tamara Jackson'
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
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    // actionSheet.present();
  }
}
