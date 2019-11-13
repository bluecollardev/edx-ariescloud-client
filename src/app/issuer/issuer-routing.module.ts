import { Routes, RouterModule } from '@angular/router';
import { IssuerPage } from './issuer.page';
import { ManageCredentialsComponent } from './components/manage-credentials/manage-credentials.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: IssuerPage,
  },
  {
    path: 'manage',
    component: ManageCredentialsComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssuerRoutingModule {}
