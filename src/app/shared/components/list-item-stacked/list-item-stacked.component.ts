import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-item-stacked',
  template: `
    <ion-item>
      <ion-label position="stacked">
        {{ label }}
      </ion-label>
      <ion-note>
        {{ value }}
      </ion-note>
    </ion-item>
  `,
  styleUrls: ['./list-item-stacked.component.css'],
})
export class ListItemStackedComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  constructor() {}

  ngOnInit() {}
}
