import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerResultsComponent } from './answer-results.component';

describe('AnswerResultsComponent', () => {
  let component: AnswerResultsComponent;
  let fixture: ComponentFixture<AnswerResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnswerResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
