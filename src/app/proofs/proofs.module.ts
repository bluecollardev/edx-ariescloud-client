import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofsRoutingModule } from './proofs-routing.module';
import { ProofsComponent } from './proofs.component';
import { ViewProofComponent } from './components/view-proof/view-proof.component';
import { RelationshipProofsComponent } from './components/relationship-proofs/relationship-proofs.component';
import { SharedModule } from '../shared/shared.module';
import { IssueProofComponent } from './components/issue-proof/issue-proof.component';
import { FindCredsCardComponent } from './components/find-creds-card/find-creds-card.component';

@NgModule({
  declarations: [
    ProofsComponent,
    ViewProofComponent,
    RelationshipProofsComponent,
    IssueProofComponent,
    FindCredsCardComponent
  ],
  imports: [CommonModule, ProofsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProofsModule {}
