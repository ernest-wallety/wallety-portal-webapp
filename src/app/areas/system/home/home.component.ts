import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { AuthenticatedBaseListComponent } from "../../../components/base/authenticated_base_list.component";
import { CustomerServiceAgentListComponent } from "../admin/users/user-parent/customer-service-agents/customer-service-agent-list.component";
import { CustomerVerificationListComponent } from "../customer-verification/customer-verification-list.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CustomerVerificationListComponent,
    CustomerServiceAgentListComponent,
    CommonModule,
  ],
  template: `
    <div *ngIf="is_service_agent">
      <app-customer-verification-list></app-customer-verification-list>
    </div>
    <div *ngIf="is_admin">
      <app-customer-service-agent-list></app-customer-service-agent-list>
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
