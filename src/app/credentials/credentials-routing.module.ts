import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials.component';
import { CreateCredentialComponent } from './components/create-credential/create-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { IssueCredentialComponent } from './components/issue-credential/issue-credential.component';

const routes: Routes = [
  {
    path: 'credentials',
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
    path: 'credentials/issue',
    component: IssueCredentialComponent
  },
  {
    path: 'credentials/issue/:id',
    component: IssueCredentialComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule {}
