import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = 'https://opentdb.com/';
  categoryList = 'api_category.php';
  numberOfQuestions = 'amount=';
  category = '&category=';
  questionDifficulty = '&difficulty=';
  questionType = '&type=';

  constructor(private http: HttpClient) { }

  getTriviaCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.categoryList}`);
  }

  getTriviaQuestions(numQuestions: string, category: string, difficulty: string, type: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}api.php?${this.numberOfQuestions}${numQuestions}${this.category}${category}${this.questionDifficulty}${difficulty}${this.questionType}${type}`
    );
  }
}
