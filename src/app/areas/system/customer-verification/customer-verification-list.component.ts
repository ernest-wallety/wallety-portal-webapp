import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { LookupHelper } from "../../../components/helpers/lookup_helper";
import { LookupModel } from "../../../components/models/lookup_model";
import { CustomerVerificationPopupComponent } from "../../../components/styles/standalone/app-popups/customer-verification/customer-verification-popup.component";
import { PagingComponent } from "../../../components/styles/standalone/pagination/paging.component";
import { SearchInputComponent } from "../../../components/styles/standalone/search-input/search-input.component";
import { SelectSingleLookupComponent } from "../../../components/styles/standalone/select-single-lookup/select-single-lookup.component";
import { TableFilterSortComponent } from "../../../components/styles/standalone/table-filter-sort/table-filter-sort.component";
import { DateRangePickerComponent } from "../../../components/styles/standalone/date-range-picker/date-range-picker.component";

@Component({
  selector: "app-customer-verification-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CustomerVerificationPopupComponent,
    SearchInputComponent,
    SelectSingleLookupComponent,
    TableFilterSortComponent,
    PagingComponent,
    DateRangePickerComponent,
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

  ngOnInit(): void {
    this.titleService.setTitle("Customer Verification");
    this.Criteria.sortField = LookupHelper.transform("u.AccountCreationDate");
    this.Criteria.sortAscending = false;

    this.refresh();
  }

  public async refresh() {
    const response = await this.get_list_sync_call(
      "Customer/GetUnverifiedCustomers",
      this.Criteria,
    );

    if (!response.isError) {
      this.ViewModel = response.data;
    }
  }

  details(item: any) {
    this.customerVerificationPopup.model = item;
    this.customerVerificationPopup.showDialog();
  }

  initialiseLookup(listFieldName: string) {
    LookupHelper.initialiseLookup(listFieldName);
  }

  public async onChangeLookup(lookup: LookupModel, listFieldName: string) {
    if (listFieldName.includes("RegistrationStatusId"))
      lookup.id = lookup.primaryKey;

    this.Criteria.lookups =
      lookup != undefined
        ? LookupHelper.onChangeLookup(lookup, listFieldName)
        : "";

    await this.refresh();
  }

  public async onChangeMultiLookup(
    multiLookup: LookupModel[],
    listFieldName: string,
  ) {
    this.Criteria.lookups =
      multiLookup.length > 0
        ? LookupHelper.onChangeMultiLookup(multiLookup, listFieldName)
        : "";

    await this.refresh();
  }

  public async sort(sortObject: any) {
    if (sortObject != null) {
      this.Criteria.sortField = LookupHelper.transform(sortObject.sortField);
      this.Criteria.sortAscending = sortObject.sortAscending;
    }

    await this.refresh();
  }

  initialiseDateRange(listFieldName: any) {
    LookupHelper.initialiseDateRange(listFieldName);
  }

  public async onChangeDateRange(range: any, listFieldName: any) {
    this.Criteria.ranges =
      range != undefined
        ? LookupHelper.onChangeDateRange(range, listFieldName)
        : "";

    await this.refresh();
  }

  onClearDateRange(listFieldName: any) {
    LookupHelper.onClearDateRange(listFieldName);
  }
}
