import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-relationships',
  template: `
    <p>
      relationships works!
    </p>
  `,
  styleUrls: ['./relationships.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationshipsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
