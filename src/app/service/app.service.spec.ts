import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });

    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch trivia questions and process them correctly', () => {
    const mockResponse = {
      results: [
        {
          question: 'Sample Question 1',
          correct_answer: 'Correct Answer 1',
          incorrect_answers: ['Incorrect Answer 1', 'Incorrect Answer 2', 'Incorrect Answer 3']
        },
        {
          question: 'Sample Question 2',
          correct_answer: 'Correct Answer 2',
          incorrect_answers: ['Incorrect Answer 4', 'Incorrect Answer 5', 'Incorrect Answer 6']
        }
      ]
    };

    const expectedQuestions = [
      {
        id: 0,
        correctAnswer: 'Correct Answer 1',
        answers: jasmine.arrayContaining(['Correct Answer 1', 'Incorrect Answer 1', 'Incorrect Answer 2', 'Incorrect Answer 3']),
        question: 'Sample Question 1'
      },
      {
        id: 1,
        correctAnswer: 'Correct Answer 2',
        answers: jasmine.arrayContaining(['Correct Answer 2', 'Incorrect Answer 4', 'Incorrect Answer 5', 'Incorrect Answer 6']),
        question: 'Sample Question 2'
      }
    ];

    service.getTriviaQuestions('2', '9', 'easy', 'multiple').subscribe(questions => {
      expect(questions).toEqual(expectedQuestions);
    });

    const req = httpMock.expectOne(`${service.baseUrl}api.php?${service.numberOfQuestionsParam}2${service.categoryParam}9${service.questionDifficultyParam}easy${service.questionTypeParam}multiple`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
