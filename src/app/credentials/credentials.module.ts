import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';

@NgModule({
  declarations: [CredentialsComponent],
  imports: [CommonModule, CredentialsRoutingModule]
})
export class CredentialsModule {}
