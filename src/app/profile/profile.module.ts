import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProfileComponent, EditProfileComponent],
  imports: [CommonModule, SharedModule, ProfileRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileModule {}
