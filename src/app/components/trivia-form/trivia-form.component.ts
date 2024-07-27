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
  hasQuestions = false;
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
        for (let i = 0; i < this.triviaQuestions.length; ++i) {
          if (i === this.triviaQuestions[i].id) {
            if (selectedAnswer === this.triviaQuestions[i].correctAnswer) {
              console.log(`You chose the correct answer!`);
              return;
            } else {
              console.log(`The answer you chose is incorrect. The correct answer is ${
                this.triviaQuestions[i].correctAnswer
              }`);
              return;
            }
          }
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
