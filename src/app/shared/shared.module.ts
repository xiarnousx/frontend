import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule
} from "@angular/material";
import { HttpInterceptorService } from "./services/http-interceptor.service";
import { ErrorInterceptorService } from "./services/error-interceptor.service";
import { ErrorDialogComponent } from "./error-dialog/error-dialog.component";

const material = [
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [HeaderComponent, ErrorDialogComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, ...material],
  exports: [FormsModule, HeaderComponent, ReactiveFormsModule, ErrorDialogComponent, RouterModule, ...material],
  providers: [HttpInterceptorService, ErrorInterceptorService],
  entryComponents: [ErrorDialogComponent]
})
export class SharedModule {}
