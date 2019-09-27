import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { MessagesComponent } from './messages/messages.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { CredentialsReceivedComponent } from './credentials-received/credentials-received.component';
import { ProofsComponent } from './proofs/proofs.component';

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
    path: 'messages',
    pathMatch: 'full',
    component: MessagesComponent
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
    path: 'credentials-received',
    pathMatch: 'full',
    component: CredentialsReceivedComponent
  },
  {
    path: 'credentials-received',
    loadChildren: `./credentials-received/credentials-received.module#CredentialsReceivedModule`
  },
  {
    path: 'credentials',
    pathMatch: 'full',
    component: CredentialsComponent
  },
  {
    path: 'credentials',
    loadChildren: `./credentials/credentials.module#CredentialsModule`
  },
  {
    path: 'verify-credentials',
    pathMatch: 'full',
    component: ProofsComponent
  },
  {
    path: 'verify-credentials',
    loadChildren: `./proofs/proofs.module#ProofsModule`
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
