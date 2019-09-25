import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsReceivedRoutingModule } from './credentials-received-routing.module';
import { CredentialsReceivedComponent } from './credentials-received.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CredentialsReceivedComponent,
    ViewCredentialComponent
  ],
  imports: [CommonModule, CredentialsReceivedRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CredentialsReceivedModule {}