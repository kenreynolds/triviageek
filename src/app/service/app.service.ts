import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { CategoryItem, QuestionItem } from "../model/trivia.model";
import { UtilsService } from "../util/utils.service";

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

  categories$ = this.http.get<any>(`${this.baseUrl}${this.categoryList}`)
    .pipe(
      map((categories) => {
        return categories.trivia_categories as CategoryItem[];
      }),
    );

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) {}

  getTriviaQuestions(
    numQuestions: string,
    category: string,
    difficulty: string,
    type: string,
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl
        + 'api.php?'
        + this.numberOfQuestions
        + numQuestions
        + this.category
        + category
        + this.questionDifficulty
        + difficulty
        + this.questionType
        + type,
    ).pipe(
      map(questions => {
        let questionItem: QuestionItem;
        let questionPool: QuestionItem[] = [];

        for (let i = 0; i < questions.results.length; ++i) {
          let answerPool: string[] = [];
          questions.results[i].incorrect_answers.forEach((incorrectAnswer: string) => {
            answerPool.push(incorrectAnswer);
          });
          answerPool.push(questions.results[i].correct_answer);
          this.utils.shuffle(answerPool);

          questionPool.push(
            questionItem = {
              id: i,
              correctAnswer: questions.results[i].correct_answer,
              answers: answerPool,
              question: questions.results[i].question,
            }
          );
        }

        return questionPool;
      }));
  }
}
