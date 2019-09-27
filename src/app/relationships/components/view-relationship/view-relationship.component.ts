import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-relationship',
  template: `
    <ion-header role="banner" class="ios header-ios hydrated">
      <ion-toolbar class="ios hydrated">
        <ion-buttons slot="start" class="sc-ion-buttons-ios-h sc-ion-buttons-ios-s ios buttons-first-slot hydrated">
          <ion-menu-button class="hydrated ios button ion-activatable ion-focusable activated"></ion-menu-button>
        </ion-buttons>
        <ion-title class="ios title-ios hydrated">Relationship Details</ion-title>
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
                  Faber University
                </ion-card-title>
                <small><small>Their ID: 123-45-6789</small></small>
                <br />
                <small><small>My DID: acbd-123-sdf-2345</small></small>
              </ion-card-content>
              <ion-list>
                <ion-item class="flex ion-justify-content-around">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Date Connected</ion-label>
                  <ion-badge color="medium" item-end>{{ graduationDate }}</ion-badge>
                </ion-item>

                <ion-item class="flex ion-justify-content-around" lines="none">
                  <!--<ion-icon name='logo-twitter' item-start style="color: #55acee"></ion-icon>-->
                  <ion-label>Status</ion-label>
                  <ion-badge color="medium" item-end>Enabled</ion-badge>
                </ion-item>
                
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
              
              <div style="display: flex">
                <ion-button
                  style="flex: 1"
                  color="danger"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="trash"></ion-icon>
                  Delete
                </ion-button>
                <ion-button
                  style="flex: 1"
                  color="light"
                  outline
                  full
                  icon-start
                  margin
                  [routerLink]="['/relationships']"
                >
                  <ion-icon name="close-circle"></ion-icon>
                  Disable
                </ion-button>
              </div>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `,
  styleUrls: ['./view-relationship.component.scss']
})
export class ViewRelationshipComponent implements OnInit {
  graduationDate: string = new Date().toDateString()

  constructor(
    public router: Router
  ) {}

  ngOnInit() {
  }

}
