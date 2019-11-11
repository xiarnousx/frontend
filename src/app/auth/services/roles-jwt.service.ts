import { RolesEnum } from "../../models/roles.enum";
import { Observable, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { TokenBaseService } from "./token-base.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/reducers";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root"
})
export class RolesJwtService extends TokenBaseService {
  private _authListener: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _$isAuth: Observable<boolean> = this._authListener.asObservable();

  constructor(private router: Router, store: Store<AppState>) {
    super(store);
  }

  get isAuth$() {
    this._authListener.next(this.token !== null);
    return this._$isAuth;
  }

  get isStudentRole() {
    return this.currentUser.role === RolesEnum.student;
  }

  get isHrRole() {
    return this.currentUser.role === RolesEnum.hr;
  }

  get isStaffRole() {
    return this.currentUser.role === RolesEnum.staff;
  }

  checkAuhtAndRedirectToStudentsPage() {
    if (this.token !== null) {
      return this.router.navigateByUrl("/students");
    }
  }
}
