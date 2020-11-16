import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SectionsDataService } from '../../sections/sections-data.service';
import { INote } from '../../sections/section/note.interface';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-modal-input',
    templateUrl: './modal-input.component.html',
    styleUrls: ['./modal-input.component.scss']
})

/*
 * Класс модального окна.
 *
 * Класс нужен для получения информации, введенной пользователем в форму внутри модального окна.
 */
export class ModalInputComponent {

    public icons = {
        faTimesCircle
    };
    public addNoteForm: FormGroup;

    /*
    * Inputs
    */
    @Input() textOnButton = 'AddNote';
    @Input() sectionId: number;

    /*
    * Outputs
    */    
    @Output() clickOnClose = new EventEmitter();
    @Output() sendNote = new EventEmitter<INote>();

    constructor(fb: FormBuilder, public data: SectionsDataService) {
        this.addNoteForm = fb.group({
            noteHeader: new FormControl('', Validators.required),
            noteText: new FormControl(''),
            noteDate: new FormControl('')
        });
    }

    /*
     * Метод отправляет родительскому элементу информацию о том, что был нажат крестик в правом верхнем углу.
     */
    public closeForm(): void {
        this.clickOnClose.emit();
    }

    /*
     * Метод отправляет в родительский компонент информацию, о введенных пользователем данных о заметке.
     */
    public addNote(): void {
        let date = this.addNoteForm.value.noteDate.split('-');
        date = `${date[0]}-${date[1]}-${date[2]}`;
        this.sendNote.emit({
            header: this.addNoteForm.value.noteHeader,
            content: this.addNoteForm.value.noteText,
            date: new Date(date),
            id: -1
        });
    }
}
