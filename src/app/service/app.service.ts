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
  categoryListParam = "api_category.php";
  numberOfQuestionsParam = "amount=";
  categoryParam = "&category=";
  questionDifficultyParam = "&difficulty=";
  questionTypeParam = "&type=";

  /**
   * Get trivia categories from the API.
   * @returns An observable of trivia categories.
   * @memberof AppService
   * @see {@link https://opentdb.com/api_config.php | Open Trivia Database API}
   */
  categories$ = this.http.get<any>(`${this.baseUrl}${this.categoryListParam}`)
    .pipe(
      map((categories) => {
        return categories.trivia_categories as CategoryItem[];
      }),
    );

  constructor(
    private http: HttpClient,
    private utils: UtilsService
  ) {}

  /**
   * Get trivia questions from the API.
   * @param numQuestions The number of questions to fetch.
   * @param category The category of the questions.
   * @param difficulty The difficulty of the questions.
   * @param type The type of the questions.
   * @returns An observable of trivia questions.
   * @memberof AppService
   * @see {@link https://opentdb.com/api_config.php | Open Trivia Database API}
   */
  getTriviaQuestions(
    numQuestions: string,
    category: string,
    difficulty: string,
    type: string,
  ): Observable<any> {
    return this.http.get<any>(
      this.baseUrl
        + 'api.php?'
        + this.numberOfQuestionsParam
        + numQuestions
        + this.categoryParam
        + category
        + this.questionDifficultyParam
        + difficulty
        + this.questionTypeParam
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
