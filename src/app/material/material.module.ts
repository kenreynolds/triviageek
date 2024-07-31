import { NgModule } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [],
  imports: [
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
  ],
  exports: [
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
  ],
})
export class MaterialModule {}
