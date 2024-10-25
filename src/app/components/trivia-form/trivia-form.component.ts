import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { QuestionItem } from "src/app/model/trivia.model";
import { AppService } from "src/app/service/app.service";
import { AnswerResultsComponent } from "../answer-results/answer-results.component";

@Component({
  selector: "app-trivia-form",
  templateUrl: "./trivia-form.component.html",
})
export class TriviaFormComponent implements OnInit {
  categories$ = this.appService.categories$;
  hasCategory = false;
  hasCorrectAnswer = false;
  hasQuestions = false;
  triviaForm!: FormGroup;
  triviaQuestions: QuestionItem[] = [];

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      answers: [""],
      category: [""],
    });

    this.answersListener();
    this.categoryListener();
  }

  /**
   * Listen to the selected answer and display the result
   * in a dialog box.
   * @returns void
   * @memberof TriviaFormComponent
   */
  answersListener() {
    const triviaAnswerControl = this.triviaForm.get('answers');
    triviaAnswerControl?.valueChanges
      .subscribe((selectedAnswer: string) => {
        this.hasCorrectAnswer = false;

        if (selectedAnswer) {
          for (const { correctAnswer, answers } of this.triviaQuestions) {
            if (answers.includes(selectedAnswer)) {
              this.hasCorrectAnswer = selectedAnswer === correctAnswer;
              this.dialog.open(AnswerResultsComponent, {
                width: '80%',
                data: {
                  correctAnswer,
                  hasCorrectAnswer: this.hasCorrectAnswer,
                }
              });
            }
          };
        }
      });
  }

  /**
   * Listen to the selected category and fetch trivia questions
   * from the API.
   * @returns void
   * @memberof TriviaFormComponent
   */
  categoryListener() {
    const triviaCategoryControl = this.triviaForm.get("category");
    triviaCategoryControl?.valueChanges
      .subscribe((selectedCategory: string) => {
        this.hasCategory = false;

        if (selectedCategory !== "") {
          this.hasCategory = true;
          this.getTriviaQuestions(selectedCategory);
        }
      },
    );
  }

  /**
   * Fetch trivia questions from the API.
   * @param {string} selectedCategory
   * @returns void
   * @memberof TriviaFormComponent
   */
  private getTriviaQuestions(selectedCategory: string) {
    this.appService
      .getTriviaQuestions("20", selectedCategory, "medium", "multiple")
      .subscribe((questions: QuestionItem[]) => {
        this.triviaQuestions = [];
        this.hasQuestions = false;

        if (questions?.length > 0) {
          this.triviaQuestions = questions;
          this.hasQuestions = true;
        }
      });
  }
}
