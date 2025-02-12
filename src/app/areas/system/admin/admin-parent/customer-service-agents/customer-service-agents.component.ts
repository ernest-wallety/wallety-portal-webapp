import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../../../components/base/authenticated_base.component";
import { ListCriteria } from "../../../../../components/models/_base_list_criteria";
import { RegisterServiceAgentPopupComponent } from "../../../../../components/styles/standalone/popups/register-service-agent/register-service-agent-popup.component";
import { SearchInputComponent } from "../../../../../components/styles/standalone/search-input/search-input.component";

@Component({
   selector: 'app-customer-service-agents',
   standalone: true,
   imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      SearchInputComponent,
      RegisterServiceAgentPopupComponent
   ],
   templateUrl: './customer-service-agents.component.html',
   styleUrls: ['./customer-service-agents.component.scss']
})

export class CustomerServiceAgentsComponent extends AuthenticatedBaseComponent implements OnInit {
   @ViewChild('registerServiceAgentPopup') registerServiceAgentPopup!: RegisterServiceAgentPopupComponent;

   criteria: ListCriteria = ListCriteria.default();


   ngOnInit(): void {
      this.refresh();
   }

   async refresh() {
      const response = await this.get_async_call_no_params('/CustomerServiceAgent/GetAccounts');

      console.log(response);

      if (!response.IsError) {
         this.ViewModel = response;
      }
   }

   register() {
      this.registerServiceAgentPopup.showDialog();
   }
}