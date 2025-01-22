import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../../components/base/authenticated_base.component";
import { CustomerVerificationListComponent } from "./customer-verification/customer-verification.component";

@Component({
   selector: 'app-admin-parent',
   standalone: true,
   imports: [
      FormsModule,
      CommonModule,
      RouterModule,
      CustomerVerificationListComponent
   ],
   templateUrl: './admin-parent.component.html',
   styleUrls: ['./admin-parent.component.scss']
})

export class AdminParentComponent extends AuthenticatedBaseComponent implements OnInit {

   ngOnInit(): void {
      this.navigateToTab();
   }

   public navigateToTab(page: string = this.route.snapshot.params['page']?.toString()) {
      this.router.navigateByUrl(`/system/admin/${page}`);

      if (isPlatformBrowser(this.platformId)) {
         document.getElementById(`${page}-tab`)?.click();
      }
   }
}