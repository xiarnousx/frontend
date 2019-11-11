import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import { isLoggedIn } from "../reducers/auth.selectors";
import { tap } from "rxjs/operators";
import { RolesJwtService } from "./roles-jwt.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router, private roles: RolesJwtService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(isLoggedIn),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigateByUrl("/login");
        }
        if ((this.roles.isHrRole || this.roles.isStaffRole) && state.url === "/student") {
          this.router.navigateByUrl("/students");
        } else if (this.roles.isStudentRole && state.url === "/students") {
          this.router.navigateByUrl("/student");
        }
      })
    );
  }
}
