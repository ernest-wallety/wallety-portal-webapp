import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-customers",
  template: `
    <p>
      Welcome to Customers!
      <br />
      You smiled, didn't you? ;)
    </p>
  `,
})
export class CustomersComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Customers");
  }
}
