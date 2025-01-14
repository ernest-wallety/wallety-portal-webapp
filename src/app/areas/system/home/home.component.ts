import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-home',
   template: `
      <p>
         Welcome home! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class HomeComponent extends AuthenticatedBaseComponent { }
