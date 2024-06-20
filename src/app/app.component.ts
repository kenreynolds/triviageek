import { Component, OnInit } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Trivia Geek';

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getTriviaQuestions();
  }

  getCategories() {
    this.appService
      .getTriviaCategories()
      .subscribe((categories) => console.log(categories));
  }

  getTriviaQuestions() {
    this.appService
      .getTriviaQuestions('10', '15', 'medium', 'multiple')
      .subscribe((questions) => console.log(questions.results));
  }
}
