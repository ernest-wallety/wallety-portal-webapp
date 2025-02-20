import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";

@Component({
  selector: "app-transaction-history",
  template: `
    <p>
      Welcome to Transaction History!
      <br />
      You smiled, didn't you? ;)
    </p>
  `,
})
export class TransactionHistoryComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Transactions");
  }
}
