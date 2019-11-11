import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth-http.service";

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem("jwt", JSON.stringify(action.token)))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
          localStorage.removeItem("jwt");
          localStorage.clear();
          this.auth.clearToken();
          if (this.auth.timer !== null) {
            clearTimeout(this.auth.timer);
          }
          this.router.navigateByUrl("/");
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router, private auth: AuthService) {}
}
