import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AnswerData } from 'src/app/model/trivia.model';

@Component({
  selector: 'app-answer-results',
  templateUrl: './answer-results.component.html'
})
export class AnswerResultsComponent {

  constructor(
    public dialogRef: MatDialogRef<AnswerResultsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AnswerData,
  ) {}

  onNextClick(): void {
    this.dialogRef.close();
  }
}
