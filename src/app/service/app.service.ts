import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CategoryItem, QuestionItem } from "../model/trivia.model";

@Injectable({
  providedIn: "root",
})
export class AppService {
  baseUrl = "https://opentdb.com/";
  categoryList = "api_category.php";
  numberOfQuestions = "amount=";
  category = "&category=";
  questionDifficulty = "&difficulty=";
  questionType = "&type=";

  categories$ = this.http.get<any>(`${this.baseUrl}${this.categoryList}`).pipe(
    map((categories) => {
      return categories.trivia_categories as CategoryItem[];
    }),
  );

  constructor(private http: HttpClient) {}

  getTriviaQuestions(
    numQuestions: string,
    category: string,
    difficulty: string,
    type: string,
  ): Observable<any> {
    return this.http.get<QuestionItem>(
      `${this.baseUrl}api.php?${this.numberOfQuestions}${numQuestions}${this.category}${category}${this.questionDifficulty}${difficulty}${this.questionType}${type}`,
    );
  }
}
