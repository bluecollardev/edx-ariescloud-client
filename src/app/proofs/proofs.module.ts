import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProofsRoutingModule } from './proofs-routing.module';
import { ProofsComponent } from './proofs.component';
import { ViewProofComponent } from './components/view-proof/view-proof.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ProofsComponent,
    ViewProofComponent
  ],
  imports: [CommonModule, ProofsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProofsModule {}
