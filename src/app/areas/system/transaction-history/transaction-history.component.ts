import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-transaction-history',
   template: `
      <p>
         Welcome to Transaction History! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class TransactionHistoryComponent extends AuthenticatedBaseComponent { }
