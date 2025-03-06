import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-lookups",
  template: `
    <p>
      Welcome to Lookups!
      <br />
      You smiled, didn't you? ;)
    </p>
  `,
})
export class LookupComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Lookups");
  }
}
