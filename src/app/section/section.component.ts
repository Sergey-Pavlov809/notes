import { Component, OnInit, Input } from '@angular/core';
import { faCogs, faPlus } from '@fortawesome/free-solid-svg-icons';
import { INote } from './note.interface';
import { ISection } from '../container/section.interface';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit, ISection {
  faCogs = faCogs;
  faPlus = faPlus;

  constructor() { }

    /*
    * Inputs
    */ 
  @Input() header: string;
  @Input() notes: INote[];

  ngOnInit(): void {
  }

  /**
  * Удаление записи.
  */
  deleteNote(id: number): void {
    let deletingNoteIndex = this.notes.findIndex( note => note.id === id);
    if (deletingNoteIndex === -1) {
      return;
    }

    this.notes.splice(deletingNoteIndex, 1);
  }
}
