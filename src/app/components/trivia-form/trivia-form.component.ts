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
  triviaForm!: FormGroup;
  triviaQuestions: QuestionItem[] = [];

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      category: [""],
    });

    this.getTriviaQuestions();
  }

  getTriviaQuestions() {
    const triviaCategoryControl = this.triviaForm.get("category");
    triviaCategoryControl?.valueChanges.subscribe(
      (selectedCategory: string) => {
        this.hasCategory = true;
        this.appService
          .getTriviaQuestions("20", selectedCategory, "medium", "multiple")
          .subscribe((questions) => {
            if (questions?.results.length > 0) {
              this.triviaQuestions = questions?.results;
              this.triviaQuestions.forEach((triviaQuestion: QuestionItem) => {
                triviaQuestion.incorrect_answers.push(
                  triviaQuestion.correct_answer,
                );
                console.log(
                  "--------------------------------------------------",
                );
                console.log(triviaQuestion);
              });
            }
          });
      },
    );
  }
}
