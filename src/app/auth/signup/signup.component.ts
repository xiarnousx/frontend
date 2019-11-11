import { Student } from "./../../models/student.model";
import { Subscription } from "rxjs";
import { RolesJwtService } from "./../services/roles-jwt.service";
import { AuthService } from "./../services/auth-http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material";
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  createStudentSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private roles: RolesJwtService,
    public snackbar: MatSnackBar
  ) {
    this.form = fb.group({
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["test", [Validators.required]]
    });
  }

  ngOnInit() {
    this.roles.checkAuhtAndRedirectToStudentsPage();
  }

  ngOnDestroy() {
    if (this.createStudentSubscription) {
      this.createStudentSubscription.unsubscribe();
    }
  }

  onSignup() {
    const isFormValid = this.form.valid;

    if (!isFormValid) return;

    this.isLoading = true;

    const val = this.form.value;
    const user = {
      fullName: val.fullName,
      email: val.email
    } as Student;

    this.createStudentSubscription = this.auth.register(user, val.password).subscribe(
      user => {
        this.form.reset({
          password: "test"
        });
        this.isLoading = false;
        this.showSnackBarSuccessMessage();
      },
      error => {
        this.isLoading = false;
      }
    );
  }

  private showSnackBarSuccessMessage() {
    const config = new MatSnackBarConfig();
    config.verticalPosition = "bottom";
    config.horizontalPosition = "right";
    config.duration = 30000;
    config.panelClass = ["snacks"];
    this.snackbar.open("Congratulations! You have successfully registered", "OK", config);
  }
}
