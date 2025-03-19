import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { LookupHelper } from "../../../components/helpers/lookup_helper";
import { Lookup } from "../../../components/models/lookup";
import { AvatarComponent } from "../../../components/styles/standalone/avatar/avatar.component";
import { PagingComponent } from "../../../components/styles/standalone/pagination/paging.component";
import { SearchInputComponent } from "../../../components/styles/standalone/search-input/search-input.component";
// import { SelectMultiLookupComponent } from "../../../components/styles/standalone/select-multi-lookup/select-multi-lookup.component";
import { TableFilterSortComponent } from "../../../components/styles/standalone/table-filter-sort/table-filter-sort.component";
import { ConvertImagePipe } from "../../../components/utils/pipes/convert-image.pipe";
import { CustomCurrencyPipe } from "../../../components/utils/pipes/currency.pipe";
import { DisplayNamePipe } from "../../../components/utils/pipes/display-name.pipe";
import { TransactionHistoryPopupComponent } from "../../../components/styles/standalone/app-popups/transaction-history/transaction-history-popup.component";

@Component({
  selector: "app-transaction-history",
  standalone: true,
  imports: [
    CommonModule,
    SearchInputComponent,
    TableFilterSortComponent,
    PagingComponent,
    AvatarComponent,
    ConvertImagePipe,
    DisplayNamePipe,
    CustomCurrencyPipe,
    // SelectMultiLookupComponent,
    TransactionHistoryPopupComponent,
  ],
  templateUrl: "./transaction-history-list.component.html",
  styleUrls: ["./transaction-history-list.component.scss"],
})
export class TransactionHistoryComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  @ViewChild("transactionHistoryPopup")
  transactionHistoryPopup!: TransactionHistoryPopupComponent;

  ngOnInit(): void {
    this.titleService.setTitle("Transactions");
    this.Criteria.sortAscending = false;
    this.refresh();
  }

  public async refresh() {
    const response = await this.get_list_sync_call(
      "/TransactionHistory/List",
      this.Criteria,
    );

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  public async sort(sortObject: any) {
    if (sortObject != null) {
      this.Criteria.sortField = LookupHelper.transform(sortObject.sortField);
      this.Criteria.sortAscending = sortObject.sortAscending;
    }

    await this.refresh();
  }

  initialiseLookup(listFieldName: string) {
    LookupHelper.initialiseLookup(listFieldName);
  }

  public async onChangeLookup(lookup: Lookup, listFieldName: string) {
    this.Criteria.lookups =
      lookup != undefined
        ? LookupHelper.onChangeLookup(lookup, listFieldName)
        : "";

    await this.refresh();
  }

  public async onChangeMultiLookup(
    multiLookup: Lookup[],
    listFieldName: string,
  ) {
    this.Criteria.lookups =
      multiLookup.length > 0
        ? LookupHelper.onChangeMultiLookup(multiLookup, listFieldName)
        : "";

    await this.refresh();
  }

  public details(item: any) {
    this.transactionHistoryPopup.showDialog(item);
  }
}
