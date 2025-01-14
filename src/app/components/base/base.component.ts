import { Directive, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../apiconnector/data.service";
import { AuthenticationHelper } from "../helpers/authentication_helper";
import { ListCriteria } from "../models/_base_list_criteria";
import { LoginResultModel } from "../models/login_result";

@Injectable()
@Directive()
export class BaseComponent {
   public LoggedInUser: LoginResultModel;
   public IsLoading: boolean = false;
   public ViewModel: any;
   public Criteria: ListCriteria = ListCriteria.default();

   // Get user detail every load and just blank populate the viewmodel
   constructor(
      public data_service: DataService,
      public router: Router,
      public route: ActivatedRoute,
      public toastr: ToastrService,
      public ngbModalService: NgbModal
      // public lookup_helper: LookupHelper,
   ) {
      this.LoggedInUser = AuthenticationHelper.get_user_detail();
      this.ViewModel = Object.assign(new Object());
   }

   // Get call with no params
   public async get_async_call_no_params(apiUrl: string) {
      this.IsLoading = true;

      var response = await this.data_service.get_async_call_no_params(apiUrl);

      this.IsLoading = false;

      return response;
   }

   // New posting method that uses a more synchronous way of getting the data
   // This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
   public async post_sync_call(apiUrl: string, payload?: object) {
      this.IsLoading = true;

      var response = await this.data_service.post_sync_call(apiUrl, payload);

      this.IsLoading = false;

      return response;
   }
}