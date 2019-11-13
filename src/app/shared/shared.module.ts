import { NgModule } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ChipComponent } from './components/chip/chip.component';
import { ListItemStackedComponent } from './components/list-item-stacked/list-item-stacked.component';
import { ListHeaderComponent } from './components/list-header/list-header.component';
import { CardHeaderComponent } from './components/card-header/card-header.component';
import { ItemHeaderComponent } from './components/item-header/item-header.component';
import { ItemToolbarComponent } from './item-toolbar/item-toolbar.component';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    ListItemComponent,
    ChipComponent,
    ListItemStackedComponent,
    ListHeaderComponent,
    CardHeaderComponent,
    ItemHeaderComponent,
    ItemToolbarComponent,
    BaseComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    ChipComponent,
    ListItemComponent,
    ListItemStackedComponent,
    CardHeaderComponent,
    ItemHeaderComponent,
    ItemToolbarComponent,
    BaseComponent,
  ],
})
export class SharedModule {}
