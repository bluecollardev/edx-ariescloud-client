import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpService } from './core/services/http.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title
              ><ion-icon name="analytics"></ion-icon> Aries Client</ion-title
            >
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <div *ngFor="let p of pages">
            <!-- Standard Menu Item -->
            <ion-menu-toggle *ngIf="p.url" autoHide="false">
              <ion-item
                [routerLink]="p.url"
                routerDirection="root"
                routerLinkActive="active"
              >
                <ion-icon [name]="p.icon" slot="start"></ion-icon>
                <ion-label>
                  {{ p.title }}
                </ion-label>
                <ion-badge
                  *ngIf="p.hasBadge && p.icon === 'mail'"
                  color="primary"
                  item-end
                  >{{ mssgCount$ | async }}</ion-badge
                >
                <ion-badge
                  *ngIf="p.hasBadge && p.icon === 'archive'"
                  color="primary"
                  item-end
                  >{{ credsCount$ | async }}</ion-badge
                >
              </ion-item>
            </ion-menu-toggle>
            <!-- Item with Children -->

            <ion-item
              button
              *ngIf="p.children?.length > 0"
              (click)="p.open = !p.open"
              [class.parent-active]="p.open"
              detail="false"
            >
              <ion-icon
                slot="start"
                name="arrow-forward"
                *ngIf="!p.open"
              ></ion-icon>
              <ion-icon
                slot="start"
                name="arrow-down"
                *ngIf="p.open"
              ></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>

            <!-- Children List for clicked Item -->
            <ion-list *ngIf="p.open" class="ion-no-margin">
              <ion-menu-toggle>
                <ion-item
                  *ngFor="let sub of p.children"
                  class="sub-item"
                  [routerLink]="sub.url"
                  routerDirection="root"
                  routerLinkActive="active"
                >
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
export class AppComponent implements OnInit {
  mssgCount$: Observable<number>;
  credsCount$: Observable<number>;

  certCount$: Observable<number>;
  title = 'edx-ariescloud-client';

  pages = [
    {
      title: 'Relationships & Invites',
      url: '/relationships/',
      icon: 'people'
    },
    /*{
      title: 'Messages',
      url: '/messages/',
      icon: 'mail',
      hasBadge: true
    },*/
    {
      title: 'Certificates of Proof',
      url: '/verify-credentials/',
      icon: 'finger-print',
      hasBadge: true
    },
    {
      title: 'Credentials Received',
      url: '/credentials-received/',
      hasBadge: true,
      icon: 'archive'
    },
    {
      title: 'Issue Credentials',
      url: '/credentials/',
      icon: 'ribbon'
    },
    {
      title: 'Credential Types',
      url: '/credentials/',
      icon: 'ribbon'
    },
    /*{
      title: 'Create Org. Credential',
      url: '/credentials/create/',
      icon: 'bookmark'
    },*/
    /*{
      title: 'Sign Out',
      url: '/',
      icon: 'log-out'
    }*/
  ];

  constructor(private menu: MenuController, private httpSvc: HttpService) {}

  async ngOnInit() {
    try {
      // TODO: When re-implementing, look back at history - we deleted the profile module
      /*const profile = await this.httpSvc
        .get<IProfileResult>('profile')
        .toPromise();*/
      this.mssgCount$ = of(2); // of(profile.messageCount);*/
      this.certCount$ = of(2); // of(2);
      this.credsCount$ = of(0); // of(profile.credsCount);
    } catch (err) {
      console.log(err);
    }
  }

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
