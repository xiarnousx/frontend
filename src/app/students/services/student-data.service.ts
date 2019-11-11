import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator, Logger, QueryParams } from "@ngrx/data";
import { Observable } from "rxjs";
import { Update } from "@ngrx/entity";
import { Student } from "../../models/student.model";
import { StudentHttpService } from "./student-http.service";

@Injectable()
export class StudentDataService extends DefaultDataService<Student> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private logger: Logger,
    private api: StudentHttpService
  ) {
    super("Student", http, httpUrlGenerator);
  }

  getAll(): Observable<Student[]> {
    return this.api.getStudents();
  }

  getWithQuery(query: string | QueryParams): Observable<Student[]> {
    return this.api.getStudentsPaginated(query["pageSize"], query["page"]);
  }

  getById(key: string | number): Observable<Student> {
    return this.api.getStudentById(key);
  }

  update(update: Update<Student>): Observable<Student> {
    return this.api.updateStudent(update.id, update.changes);
  }

  add(entity: Student): Observable<Student> {
    return this.api.addStudent(entity);
  }

  delete(id: string): Observable<string> {
    return this.api.deleteStudent(id);
  }
}
