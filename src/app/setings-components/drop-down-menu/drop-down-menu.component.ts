import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SectionsDataService } from '../../sections/sections-data.service';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss']
})

/**
 * Класс нужен для обработки событий, происходящих в выпадающем меню.
 */
export class DropDownMenuComponent implements OnInit {
  faTimesCircle = faTimesCircle;

  @Input() sectionHeader: string;
  @Input() sectionId: number;

  @Output() clickOnClose = new EventEmitter();
  @Output() selectFlag = new EventEmitter<any>();

  inputSectionHeader: FormGroup;

  invisibleInputSectionHeader = true;
  showEven = true;
  showNotEven = true;
  sortAscending = true;

  constructor(fb: FormBuilder, public sectServ: SectionsDataService, private activatedRoute: ActivatedRoute) {
    this.inputSectionHeader = fb.group({
      sectionHeader: new FormControl(this.sectionHeader, Validators.required)
    });
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( params => {
      if (params.even) {
        (document.getElementById('even' + this.sectionId) as HTMLInputElement).checked = params.even === 'true';
      }
      if (params['not-even']) {
        this.showNotEven = (document.getElementById('not-even' + this.sectionId) as HTMLInputElement).checked = params['not-even'] === 'true';
      }
      if (params['sort-ascending']) {
        (document.
        getElementById( (params['sort-ascending'] === 'true' ? '' : 'reverse-') +
        'sort-ascending' + this.sectionId) as HTMLInputElement).checked = true;
      }
    });
  }

  /**
   * Метод удаляет родительский компонент.
   */
  sendDelete(): void {
    this.sectServ.removeSection(this.sectionId);
  }

  /**
   * Метод переименовывает родительский компонент.
   */
  sendRename(): void {
    this.changeInputSectinHeaderVisibillity();
    this.sectServ.changeSectionName(this.sectionId, this.inputSectionHeader.value.sectionHeader);
    this.clickOnClose.emit();
  }

  /**
   * Метод отправляет родительскому компоненту информацию о выбранных пользователем флагах.
   */
  sendFilter(): void {
    this.showEven = (document.getElementById('even' + this.sectionId) as HTMLInputElement).checked;
    this.showNotEven = (document.getElementById('not-even' + this.sectionId) as HTMLInputElement).checked;
    this.sortAscending = (document.getElementById('sort-ascending' + this.sectionId) as HTMLInputElement).checked;

    this.selectFlag.emit({
      even: this.showEven,
      notEven: this.showNotEven,
      sortAscending: this.sortAscending
    });
  }

  changeSectionHeaderColor(e: any): void {
    this.sectServ.changeSectionHeadColor(this.sectionId, e.target.value);
  }

  changeInputSectinHeaderVisibillity(): void {
    this.invisibleInputSectionHeader = !this.invisibleInputSectionHeader;
  }
}
