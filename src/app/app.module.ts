import { ErrorInterceptorService } from "./shared/services/error-interceptor.service";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/services/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { StoreRouterConnectingModule, RouterState } from "@ngrx/router-store";
import { EntityDataModule } from "@ngrx/data";
import { Routes, RouterModule } from "@angular/router";
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from "@angular/material";
import { HttpInterceptorService } from "./shared/services/http-interceptor.service";

const routes: Routes = [
  {
    path: "students",
    loadChildren: () =>
      import("./students/students.module").then(m => {
        return m.StudentsModule;
      }),
    canActivate: [AuthGuard]
  },
  {
    path: "student",
    loadChildren: () =>
      import("./student/student.module").then(m => {
        return m.StudentModule;
      }),
    canActivate: [AuthGuard],
    pathMatch: "full"
  },
  {
    path: "register",
    component: SignupComponent,
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal
    })
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
