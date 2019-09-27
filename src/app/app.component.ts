import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>EDX Aries Client</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>

          <div *ngFor="let p of pages">

            <!-- Standard Menu Item -->
            <ion-menu-toggle *ngIf="p.url" autoHide="false">
              <ion-item [routerLink]="p.url" routerDirection="root" routerLinkActive="active">
                <ion-icon [name]="p.icon" slot="start"></ion-icon>
                <ion-label>
                  {{ p.title }}
                </ion-label>
              </ion-item>
            </ion-menu-toggle>
            <!-- Item with Children -->

            <ion-item button *ngIf="p.children?.length > 0" (click)="p.open = !p.open" [class.parent-active]="p.open" detail="false">
              <ion-icon slot="start" name="arrow-forward" *ngIf="!p.open"></ion-icon>
              <ion-icon slot="start" name="arrow-down" *ngIf="p.open"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>

            <!-- Children List for clicked Item -->
            <ion-list *ngIf="p.open" class="ion-no-margin">
              <ion-menu-toggle>
                <ion-item *ngFor="let sub of p.children" class="sub-item" [routerLink]="sub.url" routerDirection="root"
                  routerLinkActive="active">
                  <ion-icon [name]="sub.icon" slot="start"></ion-icon>
                  <ion-label>
                    {{ sub.title }}
                  </ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

          </div>
        </ion-content>

      </ion-menu>

      <ion-router-outlet id="content" main></ion-router-outlet>
    </ion-app>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'edx-ariescloud-client';

  pages = [
    {
      title: 'My Profile',
      url: '/profile/',
      icon: 'person'
    },
    {
      title: 'Certificates of Proof',
      url: '/verify-credentials/',
       icon: 'finger-print'
    },
    {
      title: 'Credentials Received',
      url: '/credentials-received/',
       icon: 'archive'
    },
    {
      title: 'My Relationships',
      url: '/relationships/',
      icon: 'people'
    },
    {
      title: 'Send Invitation',
      url: '/relationships/add/',
      icon: 'person-add'
    },
    {
      title: 'Manage Credential Types',
      url: '/credentials/',
       icon: 'ribbon'
    },
    /*{
      title: 'Create Org. Credential',
      url: '/credentials/create/',
      icon: 'bookmark'
    },*/
    {
      title: 'Sign Out',
      url: '/',
      icon: 'log-out'
    }
  ];

  constructor(private menu: MenuController) {}

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
}
