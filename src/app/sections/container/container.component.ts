import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPlus, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SectionsDataService } from './../sections-data.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})

/**
 * Класс отвечает за хранение секций.
 */
export class ContainerComponent implements OnInit {
  faPlus = faPlus;
  faTimesCircle = faTimesCircle;
  invisible = true;

  sectionHeaderInput: FormGroup;

  constructor( fb: FormBuilder, public data: SectionsDataService ) {
    this.sectionHeaderInput = fb.group({
      sectionHeader: new FormControl('', Validators.required )
    });
  }

  ngOnInit(): void {
  }

  addSection(): void {
    this.data.addSection(this.sectionHeaderInput.value.sectionHeader, []);
    this.changeVisibillity();
  }

  /**
   * Изменение видимости формы.
   */
  changeVisibillity(): void {
    this.invisible = !this.invisible;
  }
}
