import { RolesJwtService } from "./../../auth/services/roles-jwt.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Component, DoCheck, OnInit } from "@angular/core";
import { AppState } from "../../reducers";
import { logout } from "../../auth/reducers/auth.actions";
import { User } from "../../models/user.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements DoCheck, OnInit {
  isLoggedIn$: Observable<boolean>;

  currentUser: User;
  constructor(private store: Store<AppState>, private roles: RolesJwtService) {}

  /**
   * This is a bad practice.
   * @Todo detect changes outside ngDoCheck.
   */
  ngDoCheck() {
    this.isLoggedIn$ = this.roles.isAuth$;
    this.currentUser = this.roles.currentUser;
  }

  ngOnInit() {}

  onLogout() {
    this.store.dispatch(logout());
  }
}
