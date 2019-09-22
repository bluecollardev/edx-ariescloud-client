import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CredentialsRoutingModule } from './credentials-routing.module';
import { CredentialsComponent } from './credentials.component';
import { EditCredentialComponent } from './components/edit-credential/edit-credential.component';
import { ViewCredentialComponent } from './components/view-credential/view-credential.component';

@NgModule({
  declarations: [CredentialsComponent, EditCredentialComponent, ViewCredentialComponent],
  imports: [
    CommonModule,
    IonicModule,
    CredentialsRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CredentialsModule {}
