import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ion-row>
      <ion-col>
        <ion-note color="primary">{{ label }}</ion-note>
      </ion-col>
      <ion-col>
        <ion-note>{{ value }}</ion-note>
      </ion-col>
    </ion-row>
  `,
  styleUrls: ['./list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  constructor() {}

  ngOnInit() {}
}
