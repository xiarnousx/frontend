import { Injectable } from "@angular/core";
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory, EntityOp } from "@ngrx/data";
import { Student } from "../../models/student.model";
import { Observable } from "rxjs";
import { StudentHttpService } from "./student-http.service";

@Injectable()
export class StudentEntityService extends EntityCollectionServiceBase<Student> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory, private api: StudentHttpService) {
    super("Student", serviceElementsFactory);
  }

  /**
   * @description
   * This is a reseach under progress, what I wanted to do is to extend EntityCollectionServiceBase and add new actions into it
   * to be dispatched by Data service.
   *
   * Now I am simply invoking the api ditectly, without interaction with the store.
   *
   * @param search
   */
  getTotal(search?: string): Observable<number> {
    return this.api.getTotalRecords(search);
  }
}
