import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RelationshipsComponent } from './relationships.component';

const routes: Routes = [
  {
    path: 'relationships',
    component: RelationshipsComponent,
    /*children: [
      {
        path: 'module1',
        component: module1Component,
        children: [
          {
            path: 'submodule11',
            component: submodule11Component,
          },
          {
            path: '',
            redirectTo: 'submodule11',
            pathMatch: 'full'
          }
        ]
      },
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationshipsRoutingModule { }
