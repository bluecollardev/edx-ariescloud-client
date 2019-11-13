import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials.component';
import { CredentialsReceivedComponent } from './components/credentials-received/credentials-received.component';
import { CreateCredentialComponent } from './components/create-credential/create-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { ViewCredentialTypeComponent } from './components/view-credential-type/view-credential-type.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { IssueCredentialComponent } from './components/issue-credential/issue-credential.component';
import { OrgCredentialsComponent } from './components/org-credentials/org-credentials.component';
import { ViewPendingCredentialComponent } from './components/view-pending-credential/view-pending-credential.component';
import { ManageCredentialsComponent } from '../issuer/components/manage-credentials/manage-credentials.component';
import { IssueCredentialRelationshipsComponent } from './components/issue-credential-relationships/issue-credential-relationships.component';

const routes: Routes = [
  {
    path: 'credentials',
    component: CredentialsReceivedComponent,
  },
  {
    path: 'credentials/issued',
    component: CredentialsComponent,
  },
  {
    path: 'credentials/:id/recipients',
    component: CredentialsComponent,
  },
  {
    path: 'credentials/received',
    component: CredentialsReceivedComponent,
  },
  {
    path: 'credentials/received/view',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials/received/view/:id',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials/received/group/:did',
    component: OrgCredentialsComponent,
  },

  {
    path: 'credentials/type/:id/preview',
    component: ViewCredentialTypeComponent,
  },
  {
    path: 'credentials/create',
    component: CreateCredentialComponent,
  },
  {
    path: 'credentials/view',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials/view/:id',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials/edit',
    component: EditCredentialComponent,
  },
  {
    path: 'credentials/edit/:id',
    component: EditCredentialComponent,
  },
  {
    path: 'credentials/issue/:id',
    component: IssueCredentialComponent,
  },
  {
    path: 'credentials/issue/to/:id',
    component: IssueCredentialComponent,
  },
  {
    path: 'credentials/pending/:id',
    component: ViewPendingCredentialComponent,
  },
  {
    path: 'credentials/relationship',
    component: IssueCredentialRelationshipsComponent,
  },
  {
    path: 'credentials/preview/:id',
    component: IssueCredentialRelationshipsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CredentialsRoutingModule {}
