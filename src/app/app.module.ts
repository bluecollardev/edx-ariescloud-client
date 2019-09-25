import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { ProfileModule } from './profile/profile.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { CredentialsModule } from './credentials/credentials.module';
import { CredentialsReceivedModule } from './credentials-received/credentials-received.module';
import { ProofsModule } from './proofs/proofs.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    ProfileModule,
    RelationshipsModule,
    ProofsModule,
    CredentialsModule,
    CredentialsReceivedModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
