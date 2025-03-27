import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { LookupHelper } from "../../../components/helpers/lookup_helper";
import { Lookup } from "../../../components/models/lookup";
import { AvatarComponent } from "../../../components/styles/standalone/avatar/avatar.component";
import { PagingComponent } from "../../../components/styles/standalone/pagination/paging.component";
import { SearchInputComponent } from "../../../components/styles/standalone/search-input/search-input.component";
import { SelectSingleLookupComponent } from "../../../components/styles/standalone/select-single-lookup/select-single-lookup.component";
import { TableFilterSortComponent } from "../../../components/styles/standalone/table-filter-sort/table-filter-sort.component";
import { ConvertImagePipe } from "../../../components/utils/pipes/convert-image.pipe";
import { DisplayNamePipe } from "../../../components/utils/pipes/display-name.pipe";
import { PhoneFormatPipe } from "../../../components/utils/pipes/phone-format.pipe";
import { CustomCurrencyPipe } from "../../../components/utils/pipes/currency.pipe";
import { DateRangePickerComponent } from "../../../components/styles/standalone/date-range-picker/date-range-picker.component";

@Component({
  selector: "app-customers",
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    PhoneFormatPipe,
    DisplayNamePipe,
    ConvertImagePipe,
    PagingComponent,
    AvatarComponent,
    SearchInputComponent,
    SelectSingleLookupComponent,
    TableFilterSortComponent,
    CustomCurrencyPipe,
    DateRangePickerComponent,
  ],
  templateUrl: "./customers-list.component.html",
  styleUrls: ["./customers-list.component.scss"],
})
export class CustomersComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Customers");
    this.refresh();
  }

  public async refresh() {
    const response = await this.get_list_sync_call(
      "/Portal/GetCustomers",
      this.Criteria,
    );

    if (!response.IsError) this.ViewModel = response.Data;
  }

  public edit() {
    console.log("hello");
  }

  initialiseLookup(listFieldName: string) {
    LookupHelper.initialiseLookup(listFieldName);
  }

  public async onChangeLookup(lookup: Lookup, listFieldName: string) {
    if (listFieldName.includes("IsAccountActive"))
      lookup.Id = lookup.AltBoolValue;

    this.Criteria.lookups =
      lookup != undefined
        ? LookupHelper.onChangeLookup(lookup, listFieldName)
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
