import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { INote } from './../section/note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit, INote {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;

  constructor() {
    let now: Date = new Date(),
      date = [
      '0' + now.getDate(),
      '0' + (now.getMonth() + 1),
      '0' + now.getHours(),
      '0' + now.getMinutes()
    ].map(component => component.slice(-2));

    this.date = `${date.slice(0, 2).join('.')}.${now.getFullYear()} ${date.slice(2).join(':')}`;
  }

  @Input() header: string;
  @Input() content: string;
  date: string;
  @Input() id: number;

  @Output() onClickTrash = new EventEmitter<number>();

  ngOnInit(): void {
  }

  deleteNote() {
    this.onClickTrash.emit( this.id );
  }
}
