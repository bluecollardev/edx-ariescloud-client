import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelationshipsRoutingModule } from './relationships-routing.module';
import { RelationshipsComponent } from './relationships.component';


@NgModule({
  declarations: [RelationshipsComponent],
  imports: [
    CommonModule,
    RelationshipsRoutingModule
  ]
})
export class RelationshipsModule { }
