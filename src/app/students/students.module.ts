import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { Routes, RouterModule } from "@angular/router";
import { StudentHttpService } from "./services/student-http.service";
import { StudentEntityService } from "./services/student-entity.service";
import { StudentDataService } from "./services/student-data.service";
import { StudentResolver } from "./services/student.resolver";
import { StudentListComponent } from "./student-list/student-list.component";
import { EntityMetadataMap, EntityDefinitionService, EntityDataService } from "@ngrx/data";
import { Student } from "../models/student.model";

export const routes: Routes = [
  {
    path: "",
    component: StudentListComponent
  }
];

const entityMetadata: EntityMetadataMap = {
  Student: {
    selectId: (student: Student) => student.id,
    entityDispatcherOptions: {
      optimisticUpdate: false
    }
  }
};

@NgModule({
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [StudentListComponent],
  exports: [StudentListComponent],
  entryComponents: [StudentListComponent],
  providers: [StudentHttpService, StudentEntityService, StudentDataService, StudentResolver]
})
export class StudentsModule {
  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private studentDataService: StudentDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerServices({
      Student: studentDataService
    });
  }
}
