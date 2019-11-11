import { RolesJwtService } from "./../services/roles-jwt.service";
import { Component, OnInit, ViewEncapsulation, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../services/auth-http.service";
import { tap, finalize } from "rxjs/operators";
import { noop, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AppState } from "../../reducers";
import { login } from "../reducers/auth.actions";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isLoading = false;
  loginSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>,
    private roles: RolesJwtService
  ) {
    this.form = fb.group({
      email: ["hr@panel.com", [Validators.required, Validators.email]],
      password: ["test", [Validators.required]]
    });
  }

  ngOnInit() {
    this.roles.checkAuhtAndRedirectToStudentsPage();
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onLogin() {
    this.isLoading = true;
    const val = this.form.value;

    this.loginSubscription = this.auth
      .login(val.email, val.password)
      .pipe(
        tap(token => {
          this.store.dispatch(login({ token: token }));

          this.router.navigateByUrl("/students");
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(noop, error => (this.isLoading = false));
  }
}
