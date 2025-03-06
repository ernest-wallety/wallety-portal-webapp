import { CommonModule } from "@angular/common";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../../../../components/base/authenticated_base_list.component";
import { LookupHelper } from "../../../../../../components/helpers/lookup_helper";
import { Lookup } from "../../../../../../components/models/lookup";
import { UserEditPopupComponent } from "../../../../../../components/styles/standalone/app-popups/user/user-edit/user-edit-popup.component";
import { AvatarComponent } from "../../../../../../components/styles/standalone/avatar/avatar.component";
import { PagingComponent } from "../../../../../../components/styles/standalone/pagination/paging.component";
import { SearchInputComponent } from "../../../../../../components/styles/standalone/search-input/search-input.component";
import { SelectSingleLookupComponent } from "../../../../../../components/styles/standalone/select-single-lookup/select-single-lookup.component";
import { TableFilterSortComponent } from "../../../../../../components/styles/standalone/table-filter-sort/table-filter-sort.component";
import { ConvertImagePipe } from "../../../../../../components/utils/pipes/convert-image.pipe";
import { DisplayNamePipe } from "../../../../../../components/utils/pipes/display-name.pipe";
import { PhoneFormatPipe } from "../../../../../../components/utils/pipes/phone-format.pipe";

@Component({
  selector: "app-user-list",
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
    UserEditPopupComponent,
    SelectSingleLookupComponent,
    TableFilterSortComponent,
  ],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  @ViewChild("userEditPopup")
  userEditPopup!: UserEditPopupComponent;

  isSmallScreen: boolean = false;

  @HostListener("window:resize", ["$event"])
  onResize(event: Event) {
    // Use 'Event' type here
    this.isSmallScreen = (event.target as Window).innerWidth < 576;
  }

  ngOnInit(): void {
    this.isSmallScreen = window.innerWidth < 576; // Check on init
    this.titleService.setTitle("Users");
    this.refresh();
  }

  public async refresh() {
    const response = await this.get_list_sync_call(
      "/Portal/GetUsers",
      this.Criteria,
    );

    if (!response.IsError) this.ViewModel = response.Data;
  }

  public edit(id: string) {
    this.userEditPopup.showDialog(id);
  }

  public create() {
    this.userEditPopup.showDialog("");
  }

  initialiseLookup(listFieldName: string) {
    listFieldName = `u.'${listFieldName}'`;
    LookupHelper.initialiseLookup(listFieldName);
  }

  public async onChangeLookup(lookup: Lookup, listFieldName: string) {
    lookup.Id = `'${lookup.Id}'`;

    if (listFieldName === "IsAccountActive") lookup.Id = lookup.AltBoolValue;

    listFieldName = `u.'${listFieldName}'`;
    this.Criteria.lookups = LookupHelper.onChangeLookup(lookup, listFieldName);

    await this.refresh();
  }

  public async sort(sortObject: any) {
    if (sortObject != null) {
      this.Criteria.sortField = sortObject.sortField;
      this.Criteria.sortAscending = sortObject.sortAscending;
    }

    await this.refresh();
  }
}
