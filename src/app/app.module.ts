import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetingsComponentsModule } from './setings-components/setings-components.module';
import { SectionsModule } from './sections/sections.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterInputComponent } from './mater-input/mater-input.component';
import {TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader/lib/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    MaterInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SetingsComponentsModule,
    SectionsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en'
  }),
  HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
