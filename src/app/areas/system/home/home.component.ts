import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { UserListComponent } from "../admin/users/user-parent/users/user-list.component";
import { CustomerVerificationListComponent } from "../customer-verification/customer-verification-list.component";
import { CustomersComponent } from "../customers/customers-list.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CustomerVerificationListComponent,
    UserListComponent,
    CustomersComponent,
    CommonModule,
  ],
  template: `
    <div *ngIf="is_service_agent">
      <app-customer-verification-list></app-customer-verification-list>
    </div>
    <div *ngIf="is_admin">
      <app-user-list></app-user-list>
    </div>
    <div *ngIf="is_executive">
      <app-customers></app-customers>
    </div>
  `,
})
export class HomeComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  ngOnInit(): void {
    this.titleService.setTitle("Home");
  }
}
