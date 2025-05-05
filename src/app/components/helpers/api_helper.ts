import { HttpHeaders, HttpParams } from "@angular/common/http";
import { ListCriteria } from "../models/_base_list_criteria";
import { ResponseModel } from "../models/response_model";
import { ConfigHelper } from "./config_helper";
import { ExtensionMethods } from "./extension_methods";

export class ApiHelper {
  public static API_URL = `${ConfigHelper.NG_APP_API_URL}/api/v1/`;

  public static HTTP_OPTIONS: any = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  public static getListCriteriaHttpParams(criteria: ListCriteria): HttpParams {
    return new HttpParams()
      .set("pageIndex", criteria.pageIndex.toString())
      .set("pageSize", criteria.pageSize.toString())
      .set("sortField", criteria.sortField ?? "")
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
    if (ExtensionMethods.is_success_status(response.statusCode)) {
      return_response = response;
      return_response.isError = ExtensionMethods.is_error_status(
        response.statusCode,
      );
    } else if (ExtensionMethods.is_error_status(response.statusCode)) {
      return_response = response;
      return_response.isError = ExtensionMethods.is_error_status(
        response.statusCode,
      );
      return_response.errorList = [response.responseMessage];
    } else {
      return_response.errorTitle = response.title;
      return_response.errorDetail = response.detail;
      return_response.errorType = response.type;
      return_response.errorInstance = response.instance;
      return_response.responseMessage = response.detail;
      return_response.statusCode = response.status;

      return_response.isError = response.isError;
      return_response.errorDisplay = response.errorDisplay;
      return_response.showException = response.showException;
      return_response.errorList = response.errorList;
      return_response.errorRaw = response.raw;
    }

    return return_response;
  }

  // Handle the exceptions received from the http calls.
  // Add more exception types to this function and it will automatically filter up.
  public static handle_exception(
    exception: any,
    return_response: ResponseModel,
  ) {
    // return_response.IsException = true;

    try {
      if (exception.name == "HttpErrorResponse") {
        // BadRequest - so we fetch the returned data from the api that is in the BadRequest Object
        // We dig into the exception and assign it to our response model. Value = the model being returned from C#
        if (ExtensionMethods.is_error_status(exception.status)) {
          return_response.isException = exception.error.isException;
          return_response.isError = exception.error.isError;
          return_response.errorTitle = exception.error.title;
          return_response.errorDetail = exception.error.detail;
          return_response.errorType = exception.error.type;
          return_response.errorInstance = exception.error.instance;
          return_response.errorList.push(exception.error.errorList);
          return_response.statusCode = exception.status;
          return_response.errorDisplay = exception.error.errorDisplay;
        }
        // Status 0 when can't communicate with the API, we do a PING to the API just to confirm and send back relevent message.
        else if (exception.status == 0) {
          return_response.errorList.push(exception.message);
          return_response.errorList.push(this.ping_api_message());
        } else {
          return_response.errorList.push("Unknown Http Error");
        }
      }
      // Any other exceptions we just add to the error list
      else {
        return_response.errorList.push(return_response.responseMessage!);
      }
    } catch (e: any) {
      return_response.errorList.push(e.Message);
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
