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
  hasWrongAnswer = false;
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

  answersListener() {
    const triviaAnswerControl = this.triviaForm.get('answers');
    triviaAnswerControl?.valueChanges
      .subscribe((selectedAnswer: string) => {
        this.hasCorrectAnswer = false;
        this.hasWrongAnswer = false;

        if (selectedAnswer) {
          this.triviaQuestions.forEach((triviaQuestion: QuestionItem) => {
            const { correctAnswer } = triviaQuestion;

            if (triviaQuestion.answers.includes(selectedAnswer)) {
              selectedAnswer === correctAnswer ? this.hasCorrectAnswer = true : this.hasWrongAnswer = true;
              this.dialog.open(AnswerResultsComponent, {
                width: '80%',
                data: {
                  correctAnswer,
                  hasCorrectAnswer: this.hasCorrectAnswer,
                  hasWrongAnswer: this.hasWrongAnswer,
                }
              });
            }
          });
        }
      });
  }

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

  private getTriviaQuestions(selectedCategory: string) {
    this.appService
      .getTriviaQuestions("20", selectedCategory, "medium", "multiple")
      .subscribe((questions: QuestionItem[]) => {
        if (questions?.length > 0) {
          this.triviaQuestions = questions;
          this.hasQuestions = true;
        } else {
          this.triviaQuestions = [];
          this.hasQuestions = false;
        }
      });
  }
}
