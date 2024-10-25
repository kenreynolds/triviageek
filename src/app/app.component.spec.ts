import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { TriviaFormComponent } from './components/trivia-form/trivia-form.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule, HttpClientTestingModule, MaterialModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ AppComponent, TriviaFormComponent ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it ('should create app component', () => {
    expect(component).toBeTruthy();
  });
});
