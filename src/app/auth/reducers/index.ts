import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "./action-types";

export interface AuthState {
  jwt: any;
}

export const initialAuthState: AuthState = {
  jwt: undefined
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      jwt: action.token
    };
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      jwt: undefined
    };
  })
);
