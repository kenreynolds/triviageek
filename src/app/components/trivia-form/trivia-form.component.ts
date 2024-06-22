import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { QuestionItem } from "src/app/model/trivia.model";
import { AppService } from "src/app/service/app.service";
import { UtilsService } from "src/app/util/utils.service";

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
    private utils: UtilsService,
  ) {}

  ngOnInit(): void {
    this.triviaForm = this.fb.group({
      category: [""],
    });

    this.categoryListener();
  }

  categoryListener() {
    const triviaCategoryControl = this.triviaForm.get("category");
    triviaCategoryControl?.valueChanges.subscribe(
      (selectedCategory: string) => {
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
      .subscribe((questions) => {
        if (questions?.results.length > 0) {
          this.triviaQuestions = questions?.results;
          this.setTriviaAnswers();
        }
      });
  }

  setTriviaAnswers() {
    this.triviaQuestions.forEach((triviaQuestion: QuestionItem) => {
      triviaQuestion.incorrect_answers.push(triviaQuestion.correct_answer);
      triviaQuestion.incorrect_answers = this.utils.shuffle(
        triviaQuestion.incorrect_answers,
      );
      console.log("--------------------------------------------------");
      console.log(triviaQuestion);
    });
  }
}
