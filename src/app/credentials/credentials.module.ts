import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { CreateCredentialComponent } from './components/create-credential/create-credential.component';
import { IssueCredentialComponent } from './components/issue-credential/issue-credential.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CredentialsComponent,
    EditCredentialComponent,
    ViewCredentialComponent,
    CreateCredentialComponent,
    IssueCredentialComponent
  ],
  imports: [CommonModule, CredentialsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CredentialsModule {}
