import { NgModule } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ChipComponent } from './components/chip/chip.component';

@NgModule({
  declarations: [ListItemComponent, ChipComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [ReactiveFormsModule, FormsModule, IonicModule, ChipComponent]
})
export class SharedModule {}
