import { RolesJwtService } from "./services/roles-jwt.service";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { AuthService } from "./services/auth-http.service";
import { authReducer } from "./reducers";
import { AuthGuard } from "./services/auth.guard";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./reducers/auth.effects";
import { SharedModule } from "../shared/shared.module";
import { SignupComponent } from "./signup/signup.component";
import { TokenBaseService } from "./services/token-base.service";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: "", component: LoginComponent }]),
    StoreModule.forFeature("jwt", authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [LoginComponent, SignupComponent],
  exports: [LoginComponent, SignupComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard, RolesJwtService]
    };
  }
}
