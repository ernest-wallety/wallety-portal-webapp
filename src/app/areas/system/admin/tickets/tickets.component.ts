import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../../components/base/authenticated_base_list.component";

@Component({
   selector: 'app-tickets',
   template: `
      <p>
         Welcome to Tickets! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class TicketComponent extends AuthenticatedBaseListComponent implements OnInit {
   ngOnInit(): void {
      this.titleService.setTitle("Tickets");
   }
}

