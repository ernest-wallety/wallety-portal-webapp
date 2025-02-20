import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-merchants",
  template: `
    <p>
      Welcome to Merchants!
      <br />
      You smiled, didn't you? ;)
    </p>
  `,
})
export class MerchantsComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Merchants");
  }
}
