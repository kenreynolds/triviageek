import { Component } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-trivia-form",
  templateUrl: "./trivia-form.component.html",
})
export class TriviaFormComponent {
  triviaForm = this.fb.group({});

  constructor(private fb: FormBuilder) {}
}
