import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MaterialModule } from 'src/app/material/material.module';
import { TriviaFormComponent } from './trivia-form.component';

describe('TriviaFormComponent', () => {
  let component: TriviaFormComponent;
  let fixture: ComponentFixture<TriviaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, MaterialModule, ReactiveFormsModule ],
      declarations: [ TriviaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create trivia form component', () => {
    expect(component).toBeTruthy();
  });
});
