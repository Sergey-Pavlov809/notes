import { CdkDragDrop } from '@angular/cdk/drag-drop/drag-events';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionsDataService } from './../sections-data.service';
import { ISection } from './section.interface';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})

/**
 *  Хранение секций.
 */
export class ContainerComponent implements OnInit, OnDestroy {
    public readonly icons = {
        faPlus,
        faTimesCircle
    };

    private unsubscribe$ = new Subject<void>();

    public invisible = true;
    public languagesListInvisible = true;

    public sectionHeaderInput: FormGroup;
    private lang = 'en';

    /**
    * 
    */
    constructor(fb: FormBuilder, public data: SectionsDataService, private router: Router, private activatedRoute: ActivatedRoute,
                private translator: TranslateService) {
        this.sectionHeaderInput = fb.group({
            sectionHeader: new FormControl('', Validators.required)
        });
    }

    /**
    * 
    */
    public ngOnInit(): void {
        this.translator.setDefaultLang('ru');

        this.activatedRoute.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params.lang) {
                this.setlanguage(params.lang);
            } else {
                this.setlanguage('ru');
            }
        });

        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params.even) {
                (document.getElementById('all-sections-even') as HTMLInputElement).checked = params.even === 'true';
            }
            if (params['not-even']) {
                (document.getElementById('all-sections-not-even') as HTMLInputElement).checked = params['not-even'] === 'true';
            }
            if (params['sort-ascending']) {
                Array.from(document.querySelectorAll('input')).filter(input => {
                    return input.name === 'all-sections-sort-ascending';
                })[params['sort-ascending'] === 'true' ? 0 : 1].checked = true;
            }
        });
    }

    /**
    * Отписка от событий при дестрое.
    */  
    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    /**
    * добавление секции
    */
    public addSection(): void {
        this.data.addSection(this.sectionHeaderInput.value.sectionHeader, []);
        this.changeVisibillity();
    }

    /**
     * Изменение видимости.
     */
    public changeVisibillity(): void {
        this.invisible = !this.invisible;
    }

    /**
    * Изменение видимости языковой панели.
    */
    public changeLangListvisibillity(): void {
        this.languagesListInvisible = !this.languagesListInvisible;
    }

    /*
     * Изменение параметров урла.
     */
    public changeAllSectionsViewFormat(): void {
        this.router.navigate(['home', this.lang], {
            queryParams: {
                even: (document.getElementById('all-sections-even') as HTMLInputElement).checked,
                'not-even': (document.getElementById('all-sections-not-even') as HTMLInputElement).checked,
                'sort-ascending': Array.from(document.querySelectorAll('input')).filter(input => {
                    return input.name === 'all-sections-sort-ascending';
                })[0].checked
            }
        });
    }

    /*
    * Изменение языка
    */
    public changeLanguage(e: any): void {
        this.lang = e.target.value;
        this.changeAllSectionsViewFormat();
    }

    /**
    * Перемещение секции.
    */
    public dropSections(e: CdkDragDrop<ISection[]>): void {
        this.data.changeSectionPosition(e.previousIndex, e.currentIndex);
    }

    /**
     * Set language to all application.
     * @param lang
     *      Language in short form.
     *      For example: 'ru', 'en'
     */


    /**
    * Установка языка
    */
    private setlanguage(lang: string): void {
        this.translator.use(lang);
        Array.from(document.querySelectorAll('input')).filter(el => el.type === 'radio')
            .forEach(el => {
                if (el.value === lang) {
                    el.checked = true;
                }
                console.log(el)
            });
    }
}
