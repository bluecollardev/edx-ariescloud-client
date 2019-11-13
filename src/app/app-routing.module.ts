import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home.component';
import { MessagesComponent } from './messages/messages.component';
import { RelationshipsComponent } from './relationships/relationships.component';
import { CredentialsComponent } from './credentials/credentials.component';
import { ProofsComponent } from './proofs/proofs.component';
import { IssuerPage } from './issuer/issuer.page';

// tslint:disable-next-line: max-line-length
const routes: Routes = [
  { path: '', redirectTo: 'relationships', pathMatch: 'full' },
  {
    path: 'relationships',
    pathMatch: 'full',
    component: RelationshipsComponent,
  },
  {
    path: 'relationships',
    loadChildren: `./relationships/relationships.module#RelationshipsModule`,
  },
  /*{
    path: 'messages',
    pathMatch: 'full',
    component: MessagesComponent
  },*/
  {
    path: 'messages',
    loadChildren: `./messages/messages.module#MessagesModule`,
  },
  {
    path: 'credentials',
    pathMatch: 'full',
    component: CredentialsComponent,
  },
  {
    path: 'credentials',
    loadChildren: `./credentials/credentials.module#CredentialsModule`,
  },
  {
    path: 'verify-credentials',
    pathMatch: 'full',
    component: ProofsComponent,
  },
  {
    path: 'verify-credentials',
    loadChildren: `./proofs/proofs.module#ProofsModule`,
  },
  {
    path: 'issuer',
    pathMatch: 'full',
    component: IssuerPage,
  },
  { path: 'issuer', loadChildren: './issuer/issuer.module#IssuerPageModule' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
