import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../../../../components/base/authenticated_base_list.component";
import { ExtensionMethods } from "../../../../../../components/helpers/extension_methods";
import { ListCriteria } from "../../../../../../components/models/_base_list_criteria";
import { AvatarComponent } from "../../../../../../components/styles/standalone/avatar/avatar.component";
import { SearchInputComponent } from "../../../../../../components/styles/standalone/search-input/search-input.component";
import { PhoneFormatPipe } from "../../../../../../components/utils/pipes/phoneFormat";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PhoneFormatPipe,
    SearchInputComponent,
    AvatarComponent,
  ],
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  criteria: ListCriteria = ListCriteria.default();

  ngOnInit(): void {
    this.titleService.setTitle("Users");
    this.refresh();
  }

  public async refresh() {
    const response = await this.get_async_call_no_params("/Portal/GetUsers");

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  public edit(item: any) {
    console.log(item);
  }

  public create() {}

  public convert_image(img: string) {
    return img === ""
      ? undefined
      : ExtensionMethods.to_base_64_image(img || "");
  }

  public display_name(item: any) {
    return `${item.FirstName} ${item.Surname}`;
  }
}
