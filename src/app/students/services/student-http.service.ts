import { Student } from "../../models/student.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class StudentHttpService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>("students").pipe(
      map(res => res["payload"]),
      map(Students =>
        Students.map(student => {
          return {
            fullName: student.fullName,
            email: student.email,
            id: student._id,
            role: student.role,
            isActive: student.isActive
          } as Student;
        })
      )
    );
  }

  getStudentsPaginated(pageSize, page): Observable<Student[]> {
    const queryStr = `?pageSize=${pageSize}&page=${page}`;
    return this.http.get<Student[]>("students/" + queryStr).pipe(
      map(res => res["payload"]),
      map(Students =>
        Students.map(student => {
          return {
            fullName: student.fullName,
            email: student.email,
            id: student._id,
            role: student.role,
            isActive: student.isActive
          } as Student;
        })
      )
    );
  }

  getTotalRecords(search?: string): Observable<number> {
    return this.http.get("students/count?search=" + search).pipe(map(res => res["payload"]["count"]));
  }

  getStudentById(id: string | number): Observable<Student> {
    return this.http.get<Student>("students/" + id).pipe(
      map(res => res["payload"]),
      map(student => {
        return {
          fullName: student.fullName,
          email: student.email,
          id: student._id,
          role: student.role,
          isActive: student.isActive
        } as Student;
      })
    );
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>("students", student).pipe(
      map(res => res["payload"]),
      map(student => {
        return {
          fullName: student.fullName,
          email: student.email,
          id: student._id,
          role: student.role,
          isActive: student.isActive
        } as Student;
      })
    );
  }

  deleteStudent(id: string): Observable<string> {
    return this.http.delete<any>("students/" + id).pipe(map(data => id));
  }

  updateStudent(studentId: string | number, changes: Partial<Student>): Observable<Student> {
    return this.http.put("students/" + studentId, changes).pipe(map(res => res["payload"]));
  }
}
