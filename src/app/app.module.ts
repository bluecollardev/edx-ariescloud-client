import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { ProfileModule } from './profile/profile.module';
import { MessagesModule } from './messages/messages.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { CredentialsModule } from './credentials/credentials.module';
import { CredentialsReceivedModule } from './credentials-received/credentials-received.module';
import { ProofsModule } from './proofs/proofs.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ProfileModule,
    MessagesModule,
    RelationshipsModule,
    ProofsModule,
    CredentialsModule,
    CredentialsReceivedModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
