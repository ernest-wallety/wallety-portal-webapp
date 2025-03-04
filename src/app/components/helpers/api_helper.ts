import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ListCriteria } from "../models/_base_list_criteria";
import { ResponseModel } from "../models/response_model";
import { ConfigHelper } from "./config_helper";
import { ExtensionMethods } from "./extension_methods";

export class ApiHelper {
  public static API_URL: string = ConfigHelper.NG_APP_API_URL;

  public static HTTP_OPTIONS: any = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  public static getListCriteriaHttpParams(criteria: ListCriteria): HttpParams {
    return new HttpParams()
      .set("pageIndex", criteria.pageIndex.toString())
      .set("pageSize", criteria.pageSize.toString())
      .set("sort", criteria.sortField ?? "")
      .set("sortAscending", criteria.sortAscending?.toString() ?? "")
      .set("search", criteria.search ?? "")
      .set("lookups", criteria.lookups ?? "")
      .set("ranges", criteria.ranges ?? "")
      .set("id", criteria.id ?? "");
  }

  // This just builds up the full API path so we don't have to constantly use the base url in everything.
  public static get_full_api_path(action: string) {
    return this.API_URL + action;
  }

  // Function that handles response logic
  public static handle_api_response(
    response: any,
    return_response: ResponseModel,
  ): ResponseModel {
    if (ExtensionMethods.is_success_status(response.StatusCode)) {
      return_response = response;
      return_response.IsError = ExtensionMethods.is_error_status(
        response.StatusCode,
      );
    } else if (ExtensionMethods.is_error_status(response.StatusCode)) {
      return_response = response;
      return_response.IsError = ExtensionMethods.is_error_status(
        response.StatusCode,
      );
      return_response.ErrorList = [response.ResponseMessage];
    } else {
      return_response.ErrorTitle = response.Title;
      return_response.ErrorDetail = response.Detail;
      return_response.ErrorType = response.Type;
      return_response.ErrorInstance = response.Instance;
      return_response.ResponseMessage = response.Detail;
      return_response.StatusCode = response.Status;

      return_response.IsError = response.Extensions.IsError;
      return_response.ErrorDisplay = response.Extensions.ErrorDisplay;
      return_response.ShowException = response.Extensions.ShowException;
      return_response.ErrorList = response.Extensions.ErrorList;
      return_response.ErrorRaw = response.Extensions.raw;
    }

    return return_response;
  }

  // Handle the exceptions received from the http calls.
  // Add more exception types to this function and it will automatically filter up.
  public static handle_exception(
    exception: any,
    return_response: ResponseModel,
  ) {
    return_response.IsError = true;
    return_response.IsException = true;

    try {
      if (exception.name == "HttpErrorResponse") {
        // BadRequest - so we fetch the returned data from the api that is in the BadRequest Object
        // We dig into the exception and assign it to our response model. Value = the model being returned from C#
        if (ExtensionMethods.is_error_status(exception.status)) {
          return_response.ErrorTitle = exception.Title;
          return_response.ErrorDetail = exception.Detail;
          return_response.ErrorType = exception.Type;
          return_response.ErrorInstance = exception.Instance;
          return_response.ErrorList.push(exception.error.ResponseMessage);
          return_response.StatusCode = exception.status;
          return_response.ErrorDisplay = 1;
        }
        // Status 0 when can't communicate with the API, we do a PING to the API just to confirm and send back relevent message.
        else if (exception.status == 0) {
          return_response.ErrorList.push(exception.message);
          return_response.ErrorList.push(this.ping_api_message());
        } else {
          return_response.ErrorList.push("Unknown Http Error");
        }
      }
      // Any other exceptions we just add to the error list
      else {
        return_response.ErrorList.push(return_response.ResponseMessage!);
      }
    } catch (e: any) {
      return_response.ErrorList.push(e.Message);
    }

    return return_response;
  }

  // Check if the API is up with a healthcheck.
  private static ping_api_message() {
    try {
      // await this.http.get(this.get_full_api_path('auth/ping'), this.HTTP_OPTIONS).toPromise();

      return "The API is functioning correctly";
    } catch (error: any) {
      return `The API is down, a deployment may be in progress (Reason: ${error.toString()}`;
    }
  }
}
