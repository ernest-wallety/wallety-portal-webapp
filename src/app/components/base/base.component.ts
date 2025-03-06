import { HttpParams } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Injectable,
  PLATFORM_ID,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { EnumValidationDisplay } from "../enum/enum_validation_display";
import { AuthenticationHelper } from "../helpers/authentication_helper";
import { ExtensionMethods } from "../helpers/extension_methods";
import { ListCriteria } from "../models/_base_list_criteria";
import { LoginResultModel } from "../models/login_result";
import { ResponseModel } from "../models/response_model";
import { DataService } from "../services/apiconnector/data.service";
import { TitleService } from "../services/title.service";
import { ValidationPopupComponent } from "../styles/standalone/app-popups/validation/validation-popup.component";

@Injectable()
@Directive()
export class BaseComponent {
  public LoggedInUser: LoginResultModel;
  public IsLoading = false;
  public ViewModel: any;
  public Criteria: ListCriteria = ListCriteria.default();

  // Get user detail every load and just blank populate the viewmodel
  constructor(
    public data_service: DataService,
    public router: Router,
    public route: ActivatedRoute,
    public toastr: ToastrService,
    public ngbModalService: NgbModal,
    public cd: ChangeDetectorRef,
    public titleService: TitleService,
    @Inject(PLATFORM_ID) public platformId: object,
    // public lookup_helper: LookupHelper,
  ) {
    this.LoggedInUser = AuthenticationHelper.get_user_detail(this.platformId);
    this.ViewModel = Object.assign(new Object());
  }

  // New get method that uses a more Asynchronous way of getting the data
  // This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async get_list_sync_call(apiUrl: string, criteria: ListCriteria) {
    this.IsLoading = true;

    const response = await this.data_service.get_list_sync_call(
      apiUrl,
      criteria,
    );

    this.IsLoading = false;

    return response;
  }

  // Get call with no params
  public async get_async_call_no_params(apiUrl: string) {
    this.IsLoading = true;

    const response = await this.data_service.get_async_call_no_params(apiUrl);

    this.IsLoading = false;

    return response;
  }

  public async get_async_call(apiUrl: string, params: HttpParams) {
    this.IsLoading = true;

    const response = await this.data_service.get_async_call(apiUrl, params);

    this.IsLoading = false;

    return response;
  }

  // New posting method that uses a more synchronous way of getting the data
  // This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async post_sync_call(apiUrl: string, payload?: object) {
    this.IsLoading = true;

    const response = await this.data_service.post_sync_call(apiUrl, payload);

    this.IsLoading = false;

    return response;
  }

  // New posting method that uses a more synchronous way of getting the data
  // This will also handle the is loading variable that we reuse everywhere and rather in a more central place.
  public async post_sync_call_non_object(apiUrl: string, payload?: any) {
    this.IsLoading = true;

    const response = await this.data_service.post_sync_call(apiUrl, payload);

    this.IsLoading = false;

    return response;
  }

  //This uses the responses received by the data service http calls and decides what to do with it.
  public handle_response(response: ResponseModel) {
    if (ExtensionMethods.is_error_status(response.StatusCode!))
      response.IsError = true;

    if (response.IsError && response.ShowError) {
      this.handle_dialogs(response);
    } else if (response.IsException && response.ShowException) {
      //Only want popups for exception errors.
      response.ErrorDisplay = EnumValidationDisplay.Popup;
      this.handle_dialogs(response);
    } else if (response.IsError == false && response.ShowSuccess == true) {
      if (ExtensionMethods.is_error_status(response.StatusCode!)) {
        this.toastr.error(response.ResponseMessage);
      } else {
        this.toastr.success(response.ResponseMessage);
      }
    }
  }

  //Handle the toastr or popup dialogs based off the response model.
  private handle_dialogs(response: ResponseModel) {
    if (response.ErrorDisplay == EnumValidationDisplay.Popup) {
      const modalRef = this.ngbModalService.open(ValidationPopupComponent, {
        backdrop: "static",
        size: "lg",
        keyboard: false,
        centered: true,
      });

      modalRef.componentInstance.ListString = response.ErrorList;
      modalRef.componentInstance.Title = response.ErrorTitle;
      modalRef.componentInstance.Raw = response.ErrorRaw;
      modalRef.componentInstance.Type = response.ErrorType;
    } else if (response.ErrorDisplay == EnumValidationDisplay.Toastr) {
      const toastr = this.toastr;
      response.ErrorList.forEach(function (a) {
        toastr.error(a);
      });
    }
  }

  get is_logged_in(): boolean {
    return AuthenticationHelper.is_logged_in(this.platformId);
  }
  get is_admin(): boolean {
    return AuthenticationHelper.is_admin(this.platformId);
  }
  get is_service_agent(): boolean {
    return AuthenticationHelper.is_service_agent(this.platformId);
  }
  get is_customer(): boolean {
    return AuthenticationHelper.is_customer(this.platformId);
  }
}
