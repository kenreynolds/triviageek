import { NgModule } from "@angular/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";

@NgModule({
  declarations: [],
  imports: [MatCheckboxModule, MatFormFieldModule, MatSelectModule],
  exports: [MatCheckboxModule, MatFormFieldModule, MatSelectModule],
})
export class MaterialModule {}
