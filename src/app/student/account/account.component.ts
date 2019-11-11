import { RolesJwtService } from "./../../auth/services/roles-jwt.service";
import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  me: User;
  constructor(private roles: RolesJwtService) {}

  ngOnInit() {
    this.me = this.roles.currentUser;
  }
}
