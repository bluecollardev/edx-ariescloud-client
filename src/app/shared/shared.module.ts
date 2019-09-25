import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RelationshipCardComponent } from './components/relationships/relationship-card/relationship-card.component';
import { CredentialCardComponent } from './components/credentials/credential-card/credential-card.component';
import { CredentialFormComponent } from './components/credentials/credential-form/credential-form.component';

@NgModule({
  declarations: [RelationshipCardComponent, CredentialCardComponent, CredentialFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, FormsModule, IonicModule]
})
export class SharedModule { }
