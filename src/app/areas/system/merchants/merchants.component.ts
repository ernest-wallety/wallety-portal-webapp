import { Component } from "@angular/core";
import { AuthenticatedBaseComponent } from "../../../components/base/authenticated_base.component";

@Component({
   selector: 'app-merchants',
   template: `
      <p>
         Welcome to Merchants! <br />
         You smiled, didn't you? ;)
      </p>
   `
})

export class MerchantsComponent extends AuthenticatedBaseComponent { }
