import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-dashboard",
  template: `
    <p>
      Welcome to your Dashboard!
      <br />
      You smiled, didn't you? ;)
    </p>
  `,
})
export class DashboardComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Dashboard");
  }
}
