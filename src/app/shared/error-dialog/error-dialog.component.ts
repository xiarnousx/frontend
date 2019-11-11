import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-error-dialog",
  templateUrl: "./error-dialog.component.html",
  styleUrls: ["./error-dialog.component.css"]
})
export class ErrorDialogComponent implements OnInit {
  message: string;
  constructor(@Inject(MAT_DIALOG_DATA) { message }: { message: string }) {
    this.message = message;
  }

  ngOnInit() {}
}
