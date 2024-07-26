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

    console.log(this.triviaForm);
    this.answersListener();
    this.categoryListener();
  }

  answersListener() {
    const triviaAnswerControl = this.triviaForm.get('answers');
    triviaAnswerControl?.valueChanges
      .subscribe((selectedAnswer: string) => {
        for (let i = 0; i < this.triviaQuestions.length; ++i) {
          if (selectedAnswer === this.triviaQuestions[i].correctAnswer) {
            console.log(`Correct answer! '${selectedAnswer}.'`);
          } else {
            console.log(`Wrong answer: '${selectedAnswer}'.`);
          }
        }
        /* this.triviaQuestions.forEach(triviaQuestion => {
          // console.log(triviaQuestion);
          console.log(`Correct answer: ${triviaQuestion.correct_answer}`);
          console.log('--------------------------------------------------');
          selectedAnswer === triviaQuestion.correct_answer
            ? console.log('Correct answer!')
            : console.log('Sorry, that was the wrong answer.');
        }); */
      });
  }

  categoryListener() {
    const triviaCategoryControl = this.triviaForm.get("category");
    triviaCategoryControl?.valueChanges
      .subscribe((selectedCategory: string) => {
        if (selectedCategory !== "") {
          this.hasCategory = true;
          this.getTriviaQuestions(selectedCategory);
        } else {
          this.hasCategory = false;
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
