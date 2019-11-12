import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-header',
  template: `
    <ion-card-title>
      <h2>
        {{ title }}
      </h2>
    </ion-card-title>
  `,
  styleUrls: ['./card-header.component.css'],
})
export class CardHeaderComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
