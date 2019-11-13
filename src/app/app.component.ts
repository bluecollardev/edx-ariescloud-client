import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpService } from './core/services/http.service';
import { Observable, of } from 'rxjs';
import { StateService } from './core/services/state.service';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="content" side="end">
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
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  mssgCount$: Observable<number>;
  credsCount$: Observable<number>;

  certCount$: Observable<number>;
  title = 'edx-ariescloud-client';
  pages: (
    | {
        title: string;
        url: string;
        icon: string;
        show?: undefined;
        hasBadge?: undefined;
      }
    | {
        title: string;
        url: string;
        icon: string;
        show: boolean;
        hasBadge?: undefined;
      }
    | {
        title: string;
        url: string;
        hasBadge: boolean;
        icon: string;
        show: boolean;
      }
  )[];

  constructor(
    private menu: MenuController,
    private httpSvc: HttpService,
    public stateSvc: StateService,
  ) {}

  async ngOnInit() {
    const pages = [
      {
        title: 'Relationships & Invites',
        url: '/relationships/',
        icon: 'people',
        show: true,
      },

      {
        title: 'Credential Types',
        url: '/issuer/',
        icon: 'list-box',
        show: this.stateSvc.isIssuer,
      },

      {
        title: 'Issued Credentials',
        url: '/issuer/manage',
        icon: 'ribbon',
        show: this.stateSvc.isIssuer,
      },
      {
        title: 'Credentials Received',
        url: '/credentials/received/',
        hasBadge: false,
        icon: 'archive',
        show: this.stateSvc.isProver,
      },
      {
        title: 'Proof Certificates',
        url: '/verify-credentials/',
        icon: 'finger-print',
        hasBadge: false,
        show: this.stateSvc.isProver,
      },
    ];

    this.pages = pages.filter(page => page.show);
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
