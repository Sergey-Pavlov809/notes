import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SectionComponent } from './section/section.component';
import { NoteComponent } from './note/note.component';
import { SectionTitleComponent } from './section-title/section-title.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionComponent,
    NoteComponent,
    SectionTitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
