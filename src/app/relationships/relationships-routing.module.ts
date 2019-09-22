import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelationshipsComponent } from './relationships.component';
import { AddRelationshipComponent } from './components/add-relationship/add-relationship.component';
import { ViewRelationshipComponent } from './components/view-relationship/view-relationship.component';
import { EditRelationshipComponent } from './components/edit-relationship/edit-relationship.component';

const routes: Routes = [
  {
    path: 'relationships',
    component: RelationshipsComponent,
  },
  {
    path: 'relationships/add',
    component: AddRelationshipComponent,
  },
  {
    path: 'relationships/view',
    component: ViewRelationshipComponent,
  },
  {
    path: 'relationships/view/:id',
    component: ViewRelationshipComponent,
  },
  {
    path: 'relationships/edit',
    component: EditRelationshipComponent,
  },
  {
    path: 'relationships/edit/:id',
    component: EditRelationshipComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipsRoutingModule { }
