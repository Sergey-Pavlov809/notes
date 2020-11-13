import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterInputComponent } from './mater-input.component';

describe('MaterInputComponent', () => {
  let component: MaterInputComponent;
  let fixture: ComponentFixture<MaterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
