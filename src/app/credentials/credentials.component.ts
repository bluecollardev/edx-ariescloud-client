import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-credentials',
  template: `
    <p>
      credentials works!
    </p>
  `,
  styleUrls: ['./credentials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
