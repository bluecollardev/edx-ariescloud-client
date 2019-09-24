import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, FormsModule]
})
export class SharedModule {}
