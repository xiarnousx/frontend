import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../../models/student.model";
import { map, tap, finalize, delay } from "rxjs/operators";
import { TokenBaseService } from "./token-base.service";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/reducers";

@Injectable({
  providedIn: "root"
})
export class AuthService extends TokenBaseService {
  constructor(private http: HttpClient, store: Store<AppState>) {
    super(store);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>("auth/login", { email, password }).pipe(
      map(data => data["payload"]),
      delay(2000),
      tap(jwt => (this._token = jwt.token)),
      finalize(() => {
        this.currentUser;
        this.tokenExpTimer();
      })
    );
  }

  register(user: Student, password: string): Observable<Student> {
    return this.http.post<Student>("auth/register", { ...user, password }).pipe(
      map(data => data["payload"]),
      map(user => {
        return {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          isActive: user.isActive
        } as Student;
      })
    );
  }
}
