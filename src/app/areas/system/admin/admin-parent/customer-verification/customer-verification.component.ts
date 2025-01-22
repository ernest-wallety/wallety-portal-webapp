import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../../../components/base/authenticated_base.component";
import { ListCriteria } from "../../../../../components/models/_base_list_criteria";
import { CustomerVerificationComponent } from "../../../../../components/styles/standalone/popups/customer-verification/customer-verification.component";
import { SearchInputComponent } from "../../../../../components/styles/standalone/search-input/search-input.component";
import { PhoneFormatPipe } from "../../../../../components/utils/pipes/phoneFormat";

@Component({
   selector: 'app-customer-verification',
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      PhoneFormatPipe,
      CustomerVerificationComponent,
      SearchInputComponent
   ],
   templateUrl: './customer-verification.component.html',
   styleUrls: ['./customer-verification.component.scss']
})

export class CustomerVerificationListComponent extends AuthenticatedBaseComponent implements OnInit {
   @ViewChild('verificationComponent') customerVerificationComponent!: CustomerVerificationComponent;

   criteria: ListCriteria = ListCriteria.default();

   private reasons?: object;
   private statuses?: object;

   ngOnInit(): void {
      this.refresh();
   }

   async refresh() {
      const response = await this.post_sync_call('/Customer/GetUnverifiedAccounts', undefined);

      if (!response.IsError) {
         this.ViewModel = response;
         this.statuses = this.ViewModel?.Data.RegistrationStatuses
         this.reasons = this.ViewModel?.Data.VerificationRejectReasons
      }
   }

   details(item: object) {
      this.customerVerificationComponent.model = item;
      this.customerVerificationComponent.reasons = this.reasons;
      this.customerVerificationComponent.statuses = this.statuses;

      this.customerVerificationComponent.showDialog();
   }
}