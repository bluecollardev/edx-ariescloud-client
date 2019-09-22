import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationshipCardComponent } from './components/relationships/relationship-card/relationship-card.component';
import { CredentialCardComponent } from './components/credentials/credential-card/credential-card.component';
import { CredentialFormComponent } from './components/credentials/credential-form/credential-form.component';



@NgModule({
  declarations: [RelationshipCardComponent, CredentialCardComponent, CredentialFormComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
