import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <ion-item>
      <ion-label>
        {{ label }}
      </ion-label>
      <ion-badge slot="end" [color]="color">{{ value }}</ion-badge>
    </ion-item>
  `,
  styleUrls: ['./list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent implements OnInit {
  @Input() label: string;
  @Input() value: string;
  @Input() color = 'tertiary';
  constructor() {}

  ngOnInit() {}
}
