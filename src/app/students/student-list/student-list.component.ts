import { RolesJwtService } from "./../../auth/services/roles-jwt.service";
import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Student } from "../../models/student.model";
import { Subscription, Observable } from "rxjs";
import { StudentEntityService } from "../services/student-entity.service";
import { PageEvent } from "@angular/material";
import { QueryParams } from "@ngrx/data";
import { tap, first } from "rxjs/operators";

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"]
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]>;
  loading$: Observable<boolean>;
  totalPages$: Observable<number>;
  pageIndex = 1;
  pageSize = 2;
  pages = [2, 5, 10];
  isHr = false;

  private subscription: Subscription;

  constructor(private es: StudentEntityService, private roles: RolesJwtService) {}

  ngOnInit() {
    this.totalPages$ = this.es.getTotal("");
    this.pageIndex = 1;
    this.pageSize = 2;
    this.loadPage();
    this.loading$ = this.es.loading$;
    this.students$ = this.es.entities$;
    this.isHr = this.roles.isHrRole;
  }

  onUpdate(student: Student) {
    this.es.update({ id: student.id, isActive: !student.isActive });
  }

  onPageChange(pageData: PageEvent) {
    this.pageSize = pageData.pageSize;
    this.pageIndex = pageData.pageIndex + 1;
    this.loadPage();
  }

  private loadPage() {
    this.es.clearCache();
    const queryParams: QueryParams = {
      pageSize: this.pageSize.toString(),
      page: this.pageIndex.toString()
    } as QueryParams;
    this.es.getWithQuery(queryParams);
  }
}
