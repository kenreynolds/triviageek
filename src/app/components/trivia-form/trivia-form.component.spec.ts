import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { AppService } from 'src/app/service/app.service';
import { TriviaFormComponent } from './trivia-form.component';

describe('TriviaFormComponent', () => {
  let component: TriviaFormComponent;
  let fixture: ComponentFixture<TriviaFormComponent>;
  let appService: jasmine.SpyObj<AppService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let mockQuestions: any[];

  beforeEach(async () => {
    mockQuestions = [
      {
        id: 1,
        correctAnswer: 'Correct',
        answers: ['Correct', 'Wrong1', 'Wrong2'],
        question: 'Q1'
      }
    ];

    appService = jasmine.createSpyObj('AppService', ['getTriviaQuestions'], {
      categories$: of([])
    });
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule
      ],
      declarations: [TriviaFormComponent],
      providers: [
        { provide: AppService, useValue: appService },
        { provide: MatDialog, useValue: dialogSpy },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TriviaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create trivia form component', () => {
    expect(component).toBeTruthy();
  });

  it('should build the form with category and answers controls', () => {
    component.buildForm();
    expect(component.triviaForm.contains('category')).toBeTrue();
    expect(component.triviaForm.contains('answers')).toBeTrue();
  });

  it('should call getTriviaQuestions and set triviaQuestions and hasQuestions when questions are returned', () => {
    appService.getTriviaQuestions.and.returnValue(of(mockQuestions));
    (component as any).getTriviaQuestions('9');
    expect(component.triviaQuestions).toEqual(mockQuestions);
    expect(component.hasQuestions).toBeTrue();
  });

  it('should set hasQuestions to false if no questions are returned', () => {
    appService.getTriviaQuestions.and.returnValue(of([]));
    (component as any).getTriviaQuestions('9');
    expect(component.triviaQuestions).toEqual([]);
    expect(component.hasQuestions).toBeFalse();
  });

  it('categoryListener should set hasCategory and call getTriviaQuestions when category changes', () => {
    spyOn(component as any, 'getTriviaQuestions');
    component.buildForm();
    component.categoryListener();
    const control = component.triviaForm.get('category');
    control?.setValue('9');
    expect(component.hasCategory).toBeTrue();
    expect((component as any).getTriviaQuestions).toHaveBeenCalledWith('9');
  });

  it('categoryListener should not call getTriviaQuestions if category is empty', () => {
    spyOn(component as any, 'getTriviaQuestions');
    component.buildForm();
    component.categoryListener();
    const control = component.triviaForm.get('category');
    control?.setValue('');
    expect(component.hasCategory).toBeFalse();
    expect((component as any).getTriviaQuestions).not.toHaveBeenCalled();
  });

  it('answersListener should set hasCorrectAnswer true and open dialog if answer is correct', () => {
    component.triviaQuestions = mockQuestions;
    component.buildForm();
    component.answersListener();
    const control = component.triviaForm.get('answers');
    control?.setValue('Correct');
    expect(component.hasCorrectAnswer).toBeTrue();
    expect(dialogSpy.open).toHaveBeenCalledWith(jasmine.any(Function), jasmine.objectContaining({
      data: jasmine.objectContaining({ correctAnswer: 'Correct', hasCorrectAnswer: true })
    }));
  });

  it('answersListener should set hasCorrectAnswer false and open dialog if answer is incorrect', () => {
    component.triviaQuestions = mockQuestions;
    component.buildForm();
    component.answersListener();
    const control = component.triviaForm.get('answers');
    control?.setValue('Wrong1');
    expect(component.hasCorrectAnswer).toBeFalse();
    expect(dialogSpy.open).toHaveBeenCalledWith(jasmine.any(Function), jasmine.objectContaining({
      data: jasmine.objectContaining({ correctAnswer: 'Correct', hasCorrectAnswer: false })
    }));
  });

  it('should call buildForm, answersListener, and categoryListener on ngOnInit', () => {
    const buildFormSpy = spyOn(component, 'buildForm').and.callThrough();
    const answersListenerSpy = spyOn(component, 'answersListener').and.callThrough();
    const categoryListenerSpy = spyOn(component, 'categoryListener').and.callThrough();
    component.ngOnInit();
    expect(buildFormSpy).toHaveBeenCalled();
    expect(answersListenerSpy).toHaveBeenCalled();
    expect(categoryListenerSpy).toHaveBeenCalled();
  });
});
