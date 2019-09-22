import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { CredentialsComponent } from './credentials/credentials.component';

// tslint:disable-next-line: max-line-length
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent
  },
  {
    path: 'profile',
    loadChildren: `./profile/profile.module#ProfileModule`
  },
  {
    path: 'relationships',
    pathMatch: 'full',
    component: RelationshipsComponent
  },
  {
    path: 'relationships',
    loadChildren: `./relationships/relationships.module#RelationshipsModule`
  },
  {
    path: 'credentials',
    pathMatch: 'full',
    component: CredentialsComponent
  },
  {
    path: 'credentials',
    loadChildren: `./credentials/credentials.module#CredentialsModule`
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
