import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseListComponent } from "../../../../../../components/base/authenticated_base_list.component";
import { ListCriteria } from "../../../../../../components/models/_base_list_criteria";
import { RegisterServiceAgentPopupComponent } from "../../../../../../components/styles/standalone/app-popups/register-service-agent/register-service-agent-popup.component";
import { SearchInputComponent } from "../../../../../../components/styles/standalone/search-input/search-input.component";

@Component({
  selector: "app-customer-service-agent-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SearchInputComponent,
    RegisterServiceAgentPopupComponent,
  ],
  templateUrl: "./customer-service-agent-list.component.html",
  styleUrls: ["./customer-service-agent-list.component.scss"],
})
export class CustomerServiceAgentListComponent
  extends AuthenticatedBaseListComponent
  implements OnInit
{
  @ViewChild("registerServiceAgentPopup")
  registerServiceAgentPopup!: RegisterServiceAgentPopupComponent;

  criteria: ListCriteria = ListCriteria.default();

  ngOnInit(): void {
    this.titleService.setTitle("Customer Service Agents");
    this.refresh();
  }

  async refresh() {
    const response = await this.get_async_call_no_params(
      "/CustomerServiceAgent/GetAccounts",
    );

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  register() {
    this.registerServiceAgentPopup.showDialog();
  }
}
