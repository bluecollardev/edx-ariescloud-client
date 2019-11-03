import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials.component';
import { CredentialsReceivedComponent } from './components/credentials-received/credentials-received.component';
import { CreateCredentialComponent } from './components/create-credential/create-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { IssueCredentialComponent } from './components/issue-credential/issue-credential.component';
import { OrgCredentialsComponent } from './components/org-credentials/org-credentials.component';

const routes: Routes = [
  {
    path: 'credentials',
    component: CredentialsComponent
  },
  {
    path: 'credentials/issued',
    component: CredentialsComponent
  },
  {
    path: 'credentials/:id/recipients',
    component: CredentialsComponent
  },
  {
    path: 'credentials/received',
    component: CredentialsComponent
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
    path: 'credentials/types',
    component: CredentialsComponent
  },
  {
    path: 'credentials/create',
    component: CreateCredentialComponent
  },
  {
    path: 'credentials/view',
    component: ViewCredentialComponent
  },
  {
    path: 'credentials/view/:id',
    component: ViewCredentialComponent
  },
  {
    path: 'credentials/edit',
    component: EditCredentialComponent
  },
  {
    path: 'credentials/edit/:id',
    component: EditCredentialComponent
  },
  {
    path: 'credentials/issue/:id',
    component: IssueCredentialComponent
  },
  {
    path: 'credentials/issue/:id/to',
    component: IssueCredentialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule {}
