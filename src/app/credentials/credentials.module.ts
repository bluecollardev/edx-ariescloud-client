import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';
import { CredentialTypesComponent } from './components/credential-types/credential-types.component';
import { CredentialsIssuedComponent } from './components/credentials-issued/credentials-issued.component';
import { CredentialsReceivedComponent } from './components/credentials-received/credentials-received.component';
import { OrgCredentialsComponent } from './components/org-credentials/org-credentials.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { ViewCredentialTypeComponent } from './components/view-credential-type/view-credential-type.component';
import { CreateCredentialComponent } from './components/create-credential/create-credential.component';
import { IssueCredentialComponent } from './components/issue-credential/issue-credential.component';
import { IssueCredentialRelationshipsComponent } from './components/issue-credential-relationships/issue-credential-relationships.component';
import { CredentialRelationshipsComponent } from './components/credential-relationships/credential-relationships.component';
import { SharedModule } from '../shared/shared.module';
import { ViewPendingCredentialComponent } from './components/view-pending-credential/view-pending-credential.component';

@NgModule({
  declarations: [
    CredentialsComponent,
    CredentialTypesComponent,
    CredentialRelationshipsComponent,
    CredentialsIssuedComponent,
    CredentialsReceivedComponent,
    OrgCredentialsComponent,
    EditCredentialComponent,
    ViewCredentialComponent,
    ViewCredentialTypeComponent,
    CreateCredentialComponent,
    IssueCredentialComponent,
    IssueCredentialRelationshipsComponent,
    ViewPendingCredentialComponent
  ],
  imports: [CommonModule, CredentialsRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CredentialsModule {}
