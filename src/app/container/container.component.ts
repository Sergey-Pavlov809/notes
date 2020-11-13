import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ISection } from './section.interface';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  faPlus = faPlus;

  sections: ISection[] = [];


  constructor() { 
    
  }

  ngOnInit(): void {
  }

}
