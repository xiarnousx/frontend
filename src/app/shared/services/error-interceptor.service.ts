import { ErrorDialogComponent } from "./../error-dialog/error-dialog.component";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((res: HttpErrorResponse) => {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
          message: res.error.error
        };
        this.dialog.open(ErrorDialogComponent, dialogConfig);

        return throwError(res);
      })
    );
  }
}
