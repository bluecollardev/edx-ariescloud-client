import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { RelationshipsRoutingModule } from './relationships-routing.module';
import { RelationshipsComponent } from './relationships.component';
import { EditRelationshipComponent } from './components/edit-relationship/edit-relationship.component';
import { ViewRelationshipComponent } from './components/view-relationship/view-relationship.component';
import { AddRelationshipComponent } from './components/add-relationship/add-relationship.component';

@NgModule({
  declarations: [RelationshipsComponent, EditRelationshipComponent, ViewRelationshipComponent, AddRelationshipComponent],
  imports: [
    CommonModule,
    IonicModule,
    RelationshipsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RelationshipsModule { }
