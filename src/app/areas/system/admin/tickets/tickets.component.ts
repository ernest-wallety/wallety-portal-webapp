import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-tickets',
   template: `
      <p>
         Welcome to Tickets! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class TicketComponent extends AuthenticatedBaseComponent { }
