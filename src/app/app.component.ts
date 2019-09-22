import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
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
      // icon: 'home'
      children: []
    },
    {
      title: 'My Relationships',
      children: [
        {
          title: 'Manage Relationships',
          url: '/relationships/',
          // icon: 'logo-ionic'
        },
        {
          title: 'Create Relationship',
          url: '/relationships/create/',
          // icon: 'logo-ionic'
        },
        {
          title: 'Pending Connections',
          url: '/relationships/pending',
          // icon: 'logo-ionic'
        }
      ]
    },
    {
      title: 'My Credentials',
      children: [
        {
          title: 'Manage Credentials',
          url: '/credentials/',
          // icon: 'logo-ionic'
        },
        {
          title: 'Create Credential',
          url: '/credentials/create/',
          // icon: 'logo-ionic'
        },
        /*{
          title: 'Credentials Received',
          url: '/credentials/received/',
          // icon: 'logo-ionic'
        },
        {
          title: 'Credentials Owned',
          url: '/credentials/owned/',
          // icon: 'logo-google'
        }*/
      ]
    },
    {
      title: 'Sign Out',
      url: '/',
      // icon: 'home'
    },
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
