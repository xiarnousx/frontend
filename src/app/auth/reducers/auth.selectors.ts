import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./index";

export const selectAuthState = createFeatureSelector<AuthState>("jwt");

export const isLoggedIn = createSelector(
  selectAuthState,
  jwt => !!jwt
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  jwt => !jwt
);
