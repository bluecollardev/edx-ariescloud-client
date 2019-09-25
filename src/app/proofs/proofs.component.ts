import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-credentials',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons
          slot="start"
          class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated"
        >
          <ion-menu-button
            class="hydrated ios button ion-activatable ion-focusable activated"
          ></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Verify Credentials</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col sizeXs="12" sizeMd="12" pushMd="12" sizeXl="8" pushXl="2">
            <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>
            <ion-list *ngFor="let item of items.slice(0,1)">
              <ion-list-header>
                {{ item }}
              </ion-list-header>
              <ion-item-sliding>
                <ion-item [routerLink]="['edit']">
                  <ion-icon name="business" class="icon-lg"></ion-icon>
                  <ion-label>
                    <h2>{{ item }}</h2>
                    <small>DID: abcd-1234-df34-cd34</small>
                  </ion-label>
                </ion-item>
                <ion-item-options>
                  <button ion-button color="light" icon-start>
                    <ion-icon name="ios-share" class="icon-md"></ion-icon> Share
                  </button>
                </ion-item-options>
              </ion-item-sliding>
            </ion-list>

            <ion-grid style="width: 100%;">
              <ion-row>
                <ion-col>
                  <ion-list-header>
                    <ion-label>Credentials Shared With Me</ion-label>
                  </ion-list-header>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col
                  *ngFor="let cred of credentials"
                  sizeXs="6"
                  sizeSm="4"
                  sizeMd="3"
                  sizeLg="2"
                >
                  <ion-card text-center [routerLink]="['view']">
                    <ion-card-header>
                      {{ cred.issuedBy }}
                    </ion-card-header>
                    <ion-icon name="document" class="icon-lg"></ion-icon>
                    <ion-card-content>
                      {{ cred.name }}
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./proofs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProofsComponent implements OnInit {
  searchQuery: '';
  items: string[];
  credentials: any[];

  constructor(public actionSheetCtrl: ActionSheetController) {
    this.initializeItems();
  }

  ngOnInit() {}

  initializeItems() {
    this.items = ['Faber University', 'ACME Inc.'];

    this.credentials = [
      {
        issuedBy: 'Faber University',
        name: 'Transcript v1.3 for Alice Cooper'
      },
      {
        issuedBy: 'Faber University',
        name: 'Transcript v1.1 for Jonathan Smith'
      },
      {
        issuedBy: 'Faber University',
        name: 'Transcript v2.3 for Bob McKenzie'
      },
      {
        issuedBy: 'Faber University',
        name: 'Transcript v1.9 for Sally Reitman'
      }
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter(item => {
        return item.toLowerCase().indexOf(val.toLowerCase()) > -1;
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
        },
        {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
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

    // actionSheet.present();
  }
}
