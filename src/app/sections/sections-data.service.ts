import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISection } from './container/section.interface';
import { INote } from './section/note.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * Класс отвечает за работу с секциями.
 */
export class SectionsDataService {
  sections: Map<number, ISection> = new Map<number, ISection>();
  sectionsObserver$: Observable<Map<number, ISection>>;

  constructor() {
    this.sectionsObserver$ = new Observable<Map<number, ISection>>( observer => {
      observer.next( this.sections );
    });
  }

  getSections(): IterableIterator<ISection> {
    return this.sections.values();
  }

  /**
   * Метод может отформатировать массив заметок, перед тем как его выдать.
   *
   * @param sectionId
   *    ID секции
   * @param consumer
   *    Функция, которая форматирует массив заметок.
   */
  getNotes(sectionId: number, consumer: (notes: INote[]) => INote[] = notes => notes): INote[] {
    return consumer( Array.from( this.sections.get(sectionId).notes.values() ) );
  }

  addSection(name: string, notes: INote[]): void {
    this.sectionsObserver$.subscribe( sections => {
      const id = this.createId();
      sections.set(id, {
        header: name,
        notes: this.notesMapFromArr(notes),
        id,
        headerColor: '#add19a',
      });
    } );
  }

  removeSection(id: number): void {
    this.sectionsObserver$.subscribe( sections => {
      sections.delete(id);
    } );
  }

  changeSectionName(id: number, newName: string): void {
    this.sectionsObserver$.subscribe( sections => {
      sections.get(id).header = newName;
    } );
  }

  addNote(sectionId: number, note: INote): void {
    this.sectionsObserver$.subscribe( sections => {
      note.id = this.createId();
      sections.get(sectionId).notes.set(note.id, note);
    } );
  }

  deleteNote(sectionId: number, noteId: number): void {
    this.sectionsObserver$.subscribe( sections => {
      sections.get(sectionId).notes.delete(noteId);
    });
  }

  changeSectionHeadColor(sectionId: number, newColor: string): void {
    this.sectionsObserver$.subscribe( sections => {
      sections.get(sectionId).headerColor = newColor;
    } );
  }

  changeNoteContent(sectionId: number, noteId: number, newNote: INote): void {
    this.sectionsObserver$.subscribe( sections => {
      newNote.id = this.sections.get(sectionId).notes.get(noteId).id;
      sections.get(sectionId).notes.set(noteId, newNote);
    });
  }

  /**
   * Метод возвращает Map заметок с уникальным id, который создается внутри метода
   */
  private notesMapFromArr(notes: INote[]): Map<number, INote> {
    const map: Map<number, INote> = new Map<number, INote>();
    notes.forEach( n => {
      const id = this.createId();
      n.id = id;
      map.set(id, n);
    });
    return map;
  }

  // tslint:disable-next-line: member-ordering
  private id = 0;
  private createId(): number {
    this.id++;
    return this.id;
  }
}
