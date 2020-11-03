import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInputComponent } from './modal-input/modal-input.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ModalInputComponent,
    DropDownMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    ModalInputComponent,
    DropDownMenuComponent
  ]
})
export class SetingsComponentsModule { }
