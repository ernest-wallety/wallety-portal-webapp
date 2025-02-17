import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-dashboard',
   template: `
      <p>
         Welcome to your Dashboard! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class DashboardComponent extends AuthenticatedBaseComponent { }
