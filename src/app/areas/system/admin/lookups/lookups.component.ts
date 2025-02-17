import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-lookups',
   template: `
      <p>
         Welcome to Lookups! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class LookupComponent extends AuthenticatedBaseComponent { }
