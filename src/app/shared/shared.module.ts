import { NgModule } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IonicModule],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, FormsModule, IonicModule]
})
export class SharedModule {}
