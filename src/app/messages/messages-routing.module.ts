import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesComponent } from './messages.component';
import { RelationshipMessagesComponent } from './components/relationship-messages/relationship-messages.component';

const routes: Routes = [
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'messages/view',
    component: RelationshipMessagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
