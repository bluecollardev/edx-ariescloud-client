import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelationshipsComponent } from './relationships.component';

const routes: Routes = [
  {
    path: 'relationships',
    component: RelationshipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipsRoutingModule { }
