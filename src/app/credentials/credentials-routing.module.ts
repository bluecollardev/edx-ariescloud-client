import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredentialsComponent } from './credentials.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';

const routes: Routes = [
  {
    path: 'credentials',
    component: CredentialsComponent
  },
  {
    path: 'credentials/edit',
    component: EditCredentialComponent,
  },
  {
    path: 'credentials/edit/:id',
    component: EditCredentialComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CredentialsRoutingModule { }
