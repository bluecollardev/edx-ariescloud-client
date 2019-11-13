import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-toolbar',
  template: `
    <ion-toolbar color="primary">
      <ion-title>{{ title }}</ion-title>
      <ion-buttons slot="primary" *ngIf="enable">
        <ion-button click="submit()" size="large">
          <ion-label (click)="action.emit(true)">Submit</ion-label>
          <ion-icon name="checkmark"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  `,
  styleUrls: ['./item-toolbar.component.scss'],
})
export class ItemToolbarComponent implements OnInit {
  title: string;
  action = new EventEmitter<boolean>();
  enable = false;
  constructor() {
    console.log(this.title);
  }

  ngOnInit() {}
}
