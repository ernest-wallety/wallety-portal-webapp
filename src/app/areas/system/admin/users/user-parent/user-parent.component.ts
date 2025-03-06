import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../../../components/base/authenticated_base.component";
import { UserListComponent } from "./users/user-list.component";

@Component({
  selector: "app-user-parent",
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, UserListComponent],
  templateUrl: "./user-parent.component.html",
  styleUrls: ["./user-parent.component.scss"],
})
export class UserParentComponent extends AuthenticatedBaseComponent {
  // ngOnInit(): void {
  //    this.navigateToTab('customer-service-agents');
  // }
  // public navigateToTab(page: string = this.route.snapshot.params['page']?.toString()) {
  //    this.router.navigateByUrl(`/system/admin/users/${page}`);
  //    if (isPlatformBrowser(this.platformId)) {
  //       document.getElementById(`${page}-tab`)?.click();
  //    }
  // }
}
