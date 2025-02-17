import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../../../components/base/authenticated_base.component";
import { CustomerServiceAgentsComponent } from "./customer-service-agents/customer-service-agents.component";

@Component({
   selector: 'app-user-parent',
   standalone: true,
   imports: [
      FormsModule,
      CommonModule,
      RouterModule,
      CustomerServiceAgentsComponent
   ],
   templateUrl: './user-parent.component.html',
   styleUrls: ['./user-parent.component.scss']
})

export class UserParentComponent extends AuthenticatedBaseComponent implements OnInit {

   ngOnInit(): void {
      console.log("we are here")
      // this.navigateToTab('customer-service-agents');
   }

   // public navigateToTab(page: string = this.route.snapshot.params['page']?.toString()) {
   //    this.router.navigateByUrl(`/system/admin/users/${page}`);

   //    if (isPlatformBrowser(this.platformId)) {
   //       document.getElementById(`${page}-tab`)?.click();
   //    }
   // }
}