import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccountComponent } from "./account/account.component";
import { Routes, RouterModule } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    component: AccountComponent
  }
];

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [AccountComponent],
  entryComponents: [AccountComponent]
})
export class StudentModule {}
