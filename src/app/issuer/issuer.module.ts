import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuerPage } from './issuer.page';
import { ManageCredentialsComponent } from './components/manage-credentials/manage-credentials.component';
import { SharedModule } from '../shared/shared.module';
import { IssuerRoutingModule } from './issuer-routing.module';

@NgModule({
  imports: [CommonModule, IssuerRoutingModule, SharedModule],
  declarations: [IssuerPage, ManageCredentialsComponent],
  exports: [IssuerPage],
})
export class IssuerPageModule {}
