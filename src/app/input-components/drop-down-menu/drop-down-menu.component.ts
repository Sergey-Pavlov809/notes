import { Component, OnInit, EventEmitter, Output, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SectionsDataService } from '../../sections/sections-data.service';

@Component({
    selector: 'app-drop-down-menu',
    templateUrl: './drop-down-menu.component.html',
    styleUrls: ['./drop-down-menu.component.scss']
})

export class DropDownMenuComponent implements OnInit, OnDestroy {
    public readonly icons = {
        faTimesCircle
    };

    private unsubscribe$ = new Subject<void>();

    @Input() sectionHeader: string;
    @Input() sectionId: number;

    @Output() clickOnClose = new EventEmitter();
    @Output() selectFlag = new EventEmitter<any>();

    public inputSectionHeader: FormGroup;

    /*
    * 
    */
    public invisibleInputSectionHeader = true;
    private showEven = true;
    private showNotEven = true;
    private sortAscending = true;

    constructor(fb: FormBuilder, public sectServ: SectionsDataService, private activatedRoute: ActivatedRoute) {
        this.inputSectionHeader = fb.group({
            sectionHeader: new FormControl(this.sectionHeader, Validators.required)
        });
    }

    /*
    * 
    */
    public ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
            if (params.even) {
                (document.getElementById('even' + this.sectionId) as HTMLInputElement).checked = params.even === 'true';
            }
            if (params['not-even']) {
                this.showNotEven =
                    (document.getElementById('not-even' + this.sectionId) as HTMLInputElement).checked = params['not-even'] === 'true';
            }
            if (params['sort-ascending']) {
                (document.
                    getElementById((params['sort-ascending'] === 'true' ? '' : 'reverse-') +
                        'sort-ascending' + this.sectionId) as HTMLInputElement).checked = true;
            }
        });
    }

    /*
    * 
    */
    public ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    /*
     * Удаление компонента.
     */
    public sendDelete(): void {
        this.sectServ.removeSection(this.sectionId);
    }

    /*
     * Переименование компонента.
     */
    public sendRename(): void {
        this.changeInputSectinHeaderVisibillity();
        this.sectServ.changeSectionName(this.sectionId, this.inputSectionHeader.value.sectionHeader);
        this.clickOnClose.emit();
    }

    /*
     * Отправка флагов.
     */
    public sendFilter(): void {
        this.showEven = (document.getElementById('even' + this.sectionId) as HTMLInputElement).checked;
        this.showNotEven = (document.getElementById('not-even' + this.sectionId) as HTMLInputElement).checked;
        this.sortAscending = (document.getElementById('sort-ascending' + this.sectionId) as HTMLInputElement).checked;

        this.selectFlag.emit({
            even: this.showEven,
            notEven: this.showNotEven,
            sortAscending: this.sortAscending
        });
    }

    /*
     * выбор цвета хэдера.
     */
    public changeSectionHeaderColor(e: any): void {
        this.sectServ.changeSectionHeadColor(this.sectionId, e.target.value);
    }

    /*
     * Изменение видимости хэдера.
     */
    public changeInputSectinHeaderVisibillity(): void {
        this.invisibleInputSectionHeader = !this.invisibleInputSectionHeader;
    }
}
