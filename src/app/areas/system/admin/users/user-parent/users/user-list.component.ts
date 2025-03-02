import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../../../../components/base/authenticated_base_list.component";
import { ListCriteria } from "../../../../../../components/models/_base_list_criteria";
import { AvatarComponent } from "../../../../../../components/styles/standalone/avatar/avatar.component";
import { PagingComponent } from "../../../../../../components/styles/standalone/pagination/paging.component";
import { UserEditPopupComponent } from "../../../../../../components/styles/standalone/popups/user/user-edit/user-edit-popup.component";
import { SearchInputComponent } from "../../../../../../components/styles/standalone/search-input/search-input.component";
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

  criteria: ListCriteria = ListCriteria.default();

  ngOnInit(): void {
    this.titleService.setTitle("Users");
    this.refresh();
  }

  public async refresh() {
    const response = await this.get_list_sync_call(
      "/Portal/GetUsers",
      this.criteria,
    );

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  public edit(id: string) {
    this.userEditPopup.showDialog(id);
  }

  public create() {
    this.userEditPopup.showDialog("");
  }
}
