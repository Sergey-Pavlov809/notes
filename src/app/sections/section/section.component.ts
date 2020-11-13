import { Component, OnInit, Input } from '@angular/core';
import { faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { INote } from './note.interface';
import { ISection } from '../container/section.interface';
import { SectionsDataService } from '../sections-data.service';
import { quickSort } from '../../sorts/sorts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements OnInit, ISection {
  faCogs = faCogs;
  faPlus = faPlus;

  constructor(public data: SectionsDataService, private activateRoute: ActivatedRoute) {
  }

  @Input() header: string;
  @Input() notes: Map<number, INote>;
  @Input() id: number;
  @Input() headerColor: string;

  
  showEven = true;
  showNotEven = true;
  sortAscending = true;
  invisibleForm = true;
  invisibleDropAndDownMenu = true;
  invisibleChangeHeader = true;


  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe( params => {
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


  changeFormVisibillity(): void {
    this.invisibleForm = !this.invisibleForm;
  }

  changeDropAndDownMenuVisibillity(): void {
    this.invisibleDropAndDownMenu = !this.invisibleDropAndDownMenu;
  }

  addNote(note: INote): void {
    this.data.addNote(this.id, note);
    this.changeFormVisibillity();
    this.filterNotes();
  }

  /**
   * Метод отображает заметки в соответствии с заданными пользователем параметрами.
   *
   * @param e
   *    Объект, который хранит в себе информацию о выбранных пользователем параметрах фильтрации.
   */
  filterNotes(e: any = {
    even: this.showEven,
    notEven: this.showNotEven,
    sortAscending: this.sortAscending
  }): void {
    const map: Map<number, INote> = new Map<number, INote>();
    this.showEven = e.even;
    this.showNotEven = e.notEven;
    this.sortAscending = e.sortAscending;

    this.data.getNotes(this.id, notes => {
      notes = notes.filter( note =>
        (e.even && note.date.getDate() % 2 === 0) || (e.notEven && note.date.getDate() % 2 === 1)
      );
      notes = quickSort(notes, (a, b) => {
        return  (a.date.getTime() - b.date.getTime()) * (e.sortAscending ? 1 : -1);
      });
      return notes;
    }).forEach( note =>  map.set(note.id, note) );

    this.notes = map;
  }

  deleteNote(id: number): void {
    this.notes.delete(id);
  }
}
