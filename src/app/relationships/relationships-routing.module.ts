import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RelationshipsComponent } from './relationships.component';

const routes: Routes = [
  {
    path: '',
    component: RelationshipsComponent,
    children: [
      {
        path: '',
        redirectTo: 'relationships',
        pathMatch: 'full'
      },
      {
        path: 'relationships',
        component: RelationshipsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipsRoutingModule {}
