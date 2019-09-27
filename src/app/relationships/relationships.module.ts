import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelationshipsRoutingModule } from './relationships-routing.module';
import { RelationshipsComponent } from './relationships.component';
import { ViewRelationshipComponent } from './components/view-relationship/view-relationship.component';
import { AddRelationshipComponent } from './components/add-relationship/add-relationship.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    RelationshipsComponent,
    ViewRelationshipComponent,
    AddRelationshipComponent
  ],
  imports: [CommonModule, SharedModule, RelationshipsRoutingModule],
  exports: [AddRelationshipComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelationshipsModule {}
