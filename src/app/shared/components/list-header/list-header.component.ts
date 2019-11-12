import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-header',
  template: `
    <ion-list-header>
      <ion-title>
        {{ title }}
      </ion-title>
    </ion-list-header>
  `,
  styleUrls: ['./list-header.component.css'],
})
export class ListHeaderComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit() {}
}
