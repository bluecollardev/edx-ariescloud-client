import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { RouteReuseStrategy } from '@angular/router';
import { MessagesModule } from './messages/messages.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { CredentialsModule } from './credentials/credentials.module';
import { ProofsModule } from './proofs/proofs.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    SharedModule,
    HttpClientModule,
    MessagesModule,
    RelationshipsModule,
    ProofsModule,
    CredentialsModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
