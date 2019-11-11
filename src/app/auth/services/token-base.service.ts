import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { User } from "../../models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";

import { logout } from "../reducers/auth.actions";

@Injectable({
  providedIn: "root"
})
export abstract class TokenBaseService {
  protected _token = null;

  public timer = null;

  constructor(private store: Store<AppState>) {}

  get token() {
    const jwt = JSON.parse(localStorage.getItem("jwt"));
    if (jwt !== null) {
      this._token = jwt["token"];
      return this._token;
    }

    return null;
  }

  clearToken() {
    this._token = null;
  }

  get currentUser() {
    if (this.token !== null) {
      const decoded = jwt_decode(this.token);
      const user: User = {
        id: decoded._id,
        fullName: decoded.fullName,
        role: decoded.role,
        email: decoded.email
      } as User;

      return user;
    }
    return null;
  }

  get expiresIn() {
    if (this.token !== null) {
      const decoded = jwt_decode(this.token);
      return decoded.exp;
    }
    return 0;
  }

  tokenExpTimer() {
    const exp = this.expiresIn;
    if (exp === 0) {
      this.store.dispatch(logout());
    }

    const dateExp = new Date(0);
    dateExp.setUTCSeconds(exp);
    const expireSecondsDiff = (dateExp.valueOf() - new Date().valueOf()) / 1000;

    this.timer = setTimeout(() => {
      localStorage.clear();
      this.store.dispatch(logout());
    }, expireSecondsDiff * 1000);
  }
}
