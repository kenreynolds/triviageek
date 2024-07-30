import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { QuestionItem } from "src/app/model/trivia.model";
import { AppService } from "src/app/service/app.service";

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

      this.triviaQuestions.forEach((triviaQuestion: QuestionItem) => {
        const { id, correctAnswer, question } = triviaQuestion;

        if (triviaQuestion.answers.includes(selectedAnswer)) {
          console.log(`${id + 1}: ${question}`);
          if (selectedAnswer === correctAnswer) {
            console.log('Correct answer!');
            this.hasCorrectAnswer = true;
          } else {
            console.log(`Sorry, that's wrong. The correct answer was '${correctAnswer}'`);
            this.hasWrongAnswer = true;
          }
          console.log('--------------------------------------------------');
        }
      });
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

  getTriviaQuestions(selectedCategory: string) {
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
