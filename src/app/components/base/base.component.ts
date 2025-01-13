import { Directive, Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationHelper } from "../helpers/authentication_helper";
import { LoginResultModel } from "../models/login_result";

@Injectable()
@Directive()
export class BaseComponent {
   public LoggedInUser: LoginResultModel;
   public IsLoading: boolean = false;
   public ViewModel: any;

   // Get user detail every load and just blank populate the viewmodel
   constructor(
      // public data_service: DataService,
      public router: Router,
      public route: ActivatedRoute,
      // public toastr: ToastrService,
      public ngbModalService: NgbModal,
      // public lookupHelper: LookupHelper,
   ) {
      this.LoggedInUser = AuthenticationHelper.get_user_detail();
      this.ViewModel = Object.assign(new Object());
   }

   public get_current_year(): number {
      return new Date().getFullYear();
   }
}