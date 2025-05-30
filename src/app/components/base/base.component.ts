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
import { LoginResultModel } from "../models/login_result_model";
import { ResponseModel } from "../models/response_model";
import { DataService } from "../services/apiconnector/data.service";
import { TitleService } from "../services/title.service";
import { ConfirmDialogComponent } from "../styles/standalone/app-popups/confirm-dialog/confirm-dialog.component";
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
    if (ExtensionMethods.is_error_status(response.statusCode!))
      response.isError = true;

    if (response.isError && response.showError) {
      this.handle_dialogs(response);
    } else if (response.isException && response.showException) {
      //Only want popups for exception errors.
      response.errorDisplay = EnumValidationDisplay.Popup;
      this.handle_dialogs(response);
    } else if (response.isError == false && response.showSuccess == true) {
      if (ExtensionMethods.is_error_status(response.statusCode!)) {
        this.toastr.error(response.responseMessage);
      } else {
        this.toastr.success(response.responseMessage);
      }
    }
  }

  //Handle the toastr or popup dialogs based off the response model.
  private handle_dialogs(response: ResponseModel) {
    if (response.errorDisplay == EnumValidationDisplay.Popup) {
      const modalRef = this.ngbModalService.open(ValidationPopupComponent, {
        backdrop: "static",
        size: "lg",
        keyboard: false,
        centered: true,
      });

      modalRef.componentInstance.ListString = response.errorList;
      modalRef.componentInstance.Title = response.errorTitle;
      modalRef.componentInstance.Raw = response.errorRaw;
      modalRef.componentInstance.Type = response.errorType;
    } else if (response.errorDisplay == EnumValidationDisplay.Toastr) {
      const toastr = this.toastr;
      response.errorList.forEach(function (a) {
        toastr.error(a);
      });
    }
  }

  public show_yes_no_dialog(
    title: string,
    message: string,
    yesCallBack: () => void,
    noCallback: () => void,
  ) {
    const modalRef = this.ngbModalService.open(ConfirmDialogComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.onYesClick = yesCallBack;
    modalRef.componentInstance.onNoClick = noCallback;
  }
}
