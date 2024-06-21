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
  triviaForm!: FormGroup;

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
        this.appService
          .getTriviaQuestions("20", selectedCategory, "medium", "multiple")
          .subscribe((questions) => {
            console.log("--------------------------------------------------");
            console.log(questions.results as QuestionItem[]);
          });
      },
    );
  }
}
