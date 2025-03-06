import { HttpClient, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { ApiHelper } from "../../helpers/api_helper";
import { ListCriteria } from "../../models/_base_list_criteria";
import { ResponseModel } from "../../models/response_model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  @Output() public Response_Emitter: EventEmitter<any> =
    new EventEmitter<any>();

  public constructor(private http: HttpClient) {}

  // Asyncronous post call to which we wait for the call to complete and return a response.
  public async post_sync_call(
    action: string,
    payload?: object,
  ): Promise<ResponseModel> {
    return this.handle_api_call("POST", action, payload);
  }

  // Asyncronous get call to which we wait for the call to complete and return a response.
  public async get_list_sync_call(
    action: string,
    criteria: ListCriteria,
  ): Promise<ResponseModel> {
    const params = ApiHelper.getListCriteriaHttpParams(criteria);
    return this.handle_api_call("GET", action, undefined, params);
  }

  // Asyncronous get call with no params
  public async get_async_call_no_params(
    action: string,
  ): Promise<ResponseModel> {
    return this.handle_api_call("GET", action);
  }

  // Gives the basics to do the get call but needs to be wrapped in the source location, does not wait for this to complete and needs to be subscribed to.
  public async get_async_call(
    action: string,
    params: HttpParams,
  ): Promise<ResponseModel> {
    return this.handle_api_call("GET", action, undefined, params);
  }

  private async handle_api_call<T>(
    method: "GET" | "POST",
    action: string,
    payload?: T,
    params?: HttpParams,
  ): Promise<ResponseModel> {
    let return_response = new ResponseModel();
    try {
      ApiHelper.HTTP_OPTIONS.params = params || undefined;

      const response: any = await (
        method === "POST"
          ? this.http.post<object>(
              ApiHelper.get_full_api_path(action),
              payload,
              ApiHelper.HTTP_OPTIONS,
            )
          : this.http.get<object>(
              ApiHelper.get_full_api_path(action),
              ApiHelper.HTTP_OPTIONS,
            )
      ).toPromise();

      return_response = ApiHelper.handle_api_response(
        response,
        return_response,
      );
    } catch (exception) {
      return_response = ApiHelper.handle_exception(exception, return_response);
    }

    this.Response_Emitter.emit(return_response);

    return return_response;
  }
}
