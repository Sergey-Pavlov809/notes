import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { INote } from './note.interface';
import { ISection } from '../container/section.interface';
import { SectionsDataService } from '../sections-data.service';
import { quickSort } from '../../utills/sort';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-section',
    templateUrl: './section.component.html',
    styleUrls: ['./section.component.scss']
})
/**
 * Класс отвечает за хранение заметок и работу с ними внутри секции.
 */
export class SectionComponent implements OnInit, OnDestroy, ISection {

    public readonly icons = {
        faCogs,
        faPlus
    };

    constructor(public data: SectionsDataService, private activateRoute: ActivatedRoute) {
    }

    @Input() header: string;
    @Input() notes: Map<number, INote>;
    @Input() id: number;
    @Input() headerColor: string;

    /**
    * фильтры отображения.
    */
    private showEven = true;
    private showNotEven = true;
    private sortAscending = true;

    /**
    * 
    */
    public invisibleForm = true;
    public invisibleDropAndDownMenu = true;
    public invisibleChangeHeader = true;

    /**
    * 
    */
    private usubscribe$ = new Subject<void>();

    /**
    * 
    */
    public ngOnInit(): void {
        this.activateRoute.queryParams.pipe(takeUntil(this.usubscribe$)).subscribe(params => {
            if (params.even) {
                this.showEven = params.even === 'true';
            }
            if (params['not-even']) {
                this.showNotEven = params['not-even'] === 'true';
            }
            if (params['sort-ascending']) {
                this.sortAscending = params['sort-ascending'] === 'true';
            }
            this.filterNotes();
        });
    }

    /**
    * 
    */
    public ngOnDestroy(): void {
        this.usubscribe$.next();
        this.usubscribe$.complete();
    }

    /**
    * 
    */
    public changeFormVisibillity(): void {
        this.invisibleForm = !this.invisibleForm;
    }

    /**
    * 
    */    
    public changeDropAndDownMenuVisibillity(): void {
        this.invisibleDropAndDownMenu = !this.invisibleDropAndDownMenu;
    }

    /*
    * 
    */   
    public addNote(note: INote): void {
        this.data.addNote(this.id, note);
        this.changeFormVisibillity();
        this.filterNotes();
    }

    /*
     * Метод отображает заметки в соответствии с заданными пользователем параметрами.
     *
     * @param e
     *    Объект, который хранит в себе информацию о выбранных пользователем параметрах фильтрации.
     */

    /*
    * 
    */
    public filterNotes(e: any = {even: this.showEven, notEven: this.showNotEven, sortAscending: this.sortAscending}): void {
        const map: Map<number, INote> = new Map<number, INote>();
        this.showEven = e.even;
        this.showNotEven = e.notEven;
        this.sortAscending = e.sortAscending;

        this.data.getNotes(this.id, notes => {
            notes = notes.filter(note =>
                (e.even && note.date.getDate() % 2 === 0) || (e.notEven && note.date.getDate() % 2 === 1)
            );
            notes = quickSort(notes, (a, b) => {
                return (a.date.getTime() - b.date.getTime()) * (e.sortAscending ? 1 : -1);
            });
            return notes;
        }).forEach(note => map.set(note.id, note));

        this.notes = map;
    }

    /**
    * 
    */    
    public deleteNote(id: number): void {
        this.notes.delete(id);
    }
}
