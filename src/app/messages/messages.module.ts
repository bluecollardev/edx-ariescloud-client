import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { RelationshipMessagesComponent } from './components/relationship-messages/relationship-messages.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MessagesComponent,
    RelationshipMessagesComponent
  ],
  imports: [CommonModule, SharedModule, MessagesRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MessagesModule {}
