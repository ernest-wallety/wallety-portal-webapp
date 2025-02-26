import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { ListCriteria } from "../../../components/models/_base_list_criteria";
import { CustomerVerificationPopupComponent } from "../../../components/styles/standalone/popups/customer-verification/customer-verification-popup.component";
import { SearchInputComponent } from "../../../components/styles/standalone/search-input/search-input.component";
import { PhoneFormatPipe } from "../../../components/utils/pipes/phone-format.pipe";

@Component({
  selector: "app-customer-verification-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PhoneFormatPipe,
    CustomerVerificationPopupComponent,
    SearchInputComponent,
  ],
  templateUrl: "./customer-verification-list.component.html",
  styleUrls: ["./customer-verification-list.component.scss"],
})
export class CustomerVerificationListComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  @ViewChild("customerVerificationPopup")
  customerVerificationPopup!: CustomerVerificationPopupComponent;

  criteria: ListCriteria = ListCriteria.default();

  private reasons?: any;
  private statuses?: any;

  ngOnInit(): void {
    this.titleService.setTitle("Customer Verification");
    this.refresh();
  }

  async refresh() {
    const response = await this.get_async_call_no_params(
      "/Customer/GetUnverifiedAccounts",
    );

    if (!response.IsError) {
      this.ViewModel = response.Data;
      this.statuses = this.ViewModel?.RegistrationStatuses;
      this.reasons = this.ViewModel?.VerificationRejectReasons;
    }
  }

  details(item: any) {
    this.customerVerificationPopup.model = item;
    this.customerVerificationPopup.reasons = this.reasons;
    this.customerVerificationPopup.statuses = this.statuses;

    this.customerVerificationPopup.showDialog();
  }
}
