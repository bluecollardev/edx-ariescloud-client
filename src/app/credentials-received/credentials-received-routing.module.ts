import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsReceivedComponent } from './credentials-received.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';
import { OrgCredentialsComponent } from './components/org-credentials/org-credentials.component';

const routes: Routes = [
  {
    path: 'credentials-received',
    component: CredentialsReceivedComponent
  },
  {
    path: 'credentials-received/view',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials-received/view/:id',
    component: ViewCredentialComponent,
  },
  {
    path: 'credentials-received/group/:did',
    component: OrgCredentialsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsReceivedRoutingModule { }
