import { tap, filter, first } from "rxjs/operators";
import { Observable } from "rxjs";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { StudentEntityService } from "./student-entity.service";

@Injectable()
export class StudentResolver implements Resolve<boolean> {
  constructor(private es: StudentEntityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.es.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.es.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }
}
