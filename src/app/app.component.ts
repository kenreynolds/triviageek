import { Component, OnInit } from "@angular/core";
import { AppService } from "./service/app.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  title = "Trivia Geek";
  categories$ = this.appService.categories$;

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.getTriviaQuestions();
  }

  getTriviaQuestions() {
    this.appService
      .getTriviaQuestions("20", "15", "medium", "multiple")
      .subscribe((questions) => console.log(questions.results));
  }
}
