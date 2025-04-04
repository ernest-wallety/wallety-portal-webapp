import { Component } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-access-denied",
  templateUrl: "./access-denied.component.html",
  styleUrls: ["./access-denied.component.scss"],
})
export class AccessDeniedComponent extends AuthenticatedBaseListComponent {}
