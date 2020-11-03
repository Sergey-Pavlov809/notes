import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionComponent } from './section/section.component';
import { NoteComponent } from './note/note.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetingsComponentsModule } from './../setings-components/setings-components.module';
import { MapValuesPipe } from './map-values.pipe';
import { ContainerComponent } from './container/container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestPipe } from './test.pipe';

@NgModule({
  declarations: [
    SectionComponent,
    NoteComponent,
    MapValuesPipe,
    ContainerComponent,
    TestPipe
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SetingsComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SectionComponent,
    NoteComponent,
    ContainerComponent
  ]
})
export class SectionsModule { }
