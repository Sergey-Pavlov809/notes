import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalInputComponent } from './modal-input/modal-input.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        ModalInputComponent,
        DropDownMenuComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'ru'
        }),
        HttpClientModule
    ],
    exports: [
        ModalInputComponent,
        DropDownMenuComponent
    ]
})
export class SetingsComponentsModule { }
