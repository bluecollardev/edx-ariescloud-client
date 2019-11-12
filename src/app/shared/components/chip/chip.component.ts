import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-chip',
  template: `
    <ion-chip [outline]="outline" [color]="color">
      <ion-icon [name]="icon" [color]="iconColor" size="small"></ion-icon>
      <ion-label [color]="labelColor">
        {{ label }}
      </ion-label>
    </ion-chip>
  `,
  styleUrls: ['./chip.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent implements OnInit {
  @Input() icon = 'check';
  @Input() label = 'label';
  @Input() color = 'dark';
  @Input() labelColor = '';
  @Input() iconColor = 'primary';
  @Input() outline = false;

  constructor() {}

  ngOnInit() {}
}
