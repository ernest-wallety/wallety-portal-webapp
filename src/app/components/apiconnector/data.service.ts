import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { ConfigHelper } from "../helpers/config_helper";
import { ListCriteria } from "../models/_base_list_criteria";
import { ResponseModel } from "../models/response_model";


@Injectable({
   providedIn: 'root',
})
export class DataService {
   @Output() public Response_Emitter: EventEmitter<any> = new EventEmitter<any>();

   private HTTP_OPTIONS: any = {
      headers: new HttpHeaders({
         'Content-Type': 'application/json',
      }),
   };

   private API_URL: string = ConfigHelper.NG_APP_API_URL;

   public constructor(private http: HttpClient) { }

   getListCriteriaHttpParams(criteria: ListCriteria): HttpParams {
      const params = new HttpParams()
         .set('pageIndex', criteria.pageIndex.toString())
         .set('pageSize', criteria.pageSize.toString())
         .set('sort', criteria.sort ?? '')
         .set('sortAscending', criteria.sortAscending?.toString() ?? '')
         .set('search', criteria.search ?? '')
         .set('lookups', criteria.lookups ?? '')
         .set('ranges', criteria.ranges ?? '')
         .set('id', criteria.id ?? '');
      return params;
   }

   // Syncronous post call to which we wait for the call to complete and return a response.
   public async post_sync_call(action: string, payload?: object): Promise<ResponseModel> {
      let return_response = new ResponseModel();

      try {
         const response: any = await this.http
            .post<object>(this.get_full_api_path(action), payload, this.HTTP_OPTIONS)
            .toPromise();

         return_response.Data = response.Data;
         return_response.ResponseMessage = response.ResponseMessage;
         return_response.StatusCode = response.StatusCode;

      } catch (exception) {
         return_response = await this.handle_exception(exception, return_response);
      }

      this.Response_Emitter.emit(return_response);

      return return_response;
   }

   // Syncronous post call to which we wait for the call to complete and return a response.
   public async post_sync_call_non_object(action: string, payload?: any): Promise<ResponseModel> {
      let return_response = new ResponseModel();

      try {
         const response: any = await this.http
            .post<object>(this.get_full_api_path(action), payload, this.HTTP_OPTIONS)
            .toPromise();

         return_response.Data = response.Data;
         return_response.ResponseMessage = response.ResponseMessage;
         return_response.StatusCode = response.StatusCode;

      } catch (exception) {
         return_response = await this.handle_exception(exception, return_response);
      }

      this.Response_Emitter.emit(return_response);

      return return_response;
   }

   // Get call with no params
   public async get_async_call_no_params(action: string): Promise<ResponseModel> {
      let return_response = new ResponseModel();

      try {
         const response: any = await this.http
            .get(this.get_full_api_path(action), this.HTTP_OPTIONS)
            .toPromise();

         return_response.Data = response.Data;
         return_response.ResponseMessage = response.ResponseMessage;
         return_response.StatusCode = response.StatusCode;

      } catch (exception) {
         console.log(exception)

         return_response = await this.handle_exception(exception, return_response);
      }

      return return_response;
   }

   //Gives the basics to do the get call but needs to be wrapped in the source location, does not wait for this to complete and needs to be subscribed to.
   public async get_async_call(action: string, params: HttpParams): Promise<ResponseModel> {
      let return_response = new ResponseModel();

      try {
         this.HTTP_OPTIONS.params = params;

         const response: any = await this.http
            .get(this.get_full_api_path(action), this.HTTP_OPTIONS)
            .toPromise();

         return_response.Data = response.Data;
         return_response.ResponseMessage = response.ResponseMessage;
         return_response.StatusCode = response.StatusCode;

      } catch (exception) {
         console.error(exception);

         return_response = await this.handle_exception(exception, return_response);
      }

      this.Response_Emitter.emit(return_response);

      return return_response;
   }

   // Check if the API is up with a healthcheck.
   private async ping_api_message() {
      console.log('PING');
      try {
         // await this.http.get(this.get_full_api_path('auth/ping'), this.HTTP_OPTIONS).toPromise();

         return 'The API is functioning correctly';
      } catch (error: any) {
         return `The API is down, a deployment may be in progress (Reason: ${error.toString()}`;
      }
   }

   // This just builds up the full API path so we don't have to constantly use the base url in everything.
   private get_full_api_path(action: string) {
      return this.API_URL + action;
   }

   //Handle the exceptions received from the http calls.
   //Add more exception types to this function and it will automatically filter up.
   private async handle_exception(exception: any, return_response: ResponseModel) {
      return_response.IsError = true;
      return_response.IsException = true;

      console.log(exception)

      try {
         if (exception.name == "HttpErrorResponse") {
            // BadRequest - so we fetch the returned data from the api that is in the BadRequest Object
            // We dig into the exception and assign it to our response model. Value = the model being returned from C#
            if (
               exception.status == 400 ||
               exception.status == 404 ||
               exception.status == 401 ||
               exception.status == 424 ||
               exception.status == 403 ||
               exception.status == 501 ||
               exception.status == 409
            ) {
               return_response.ErrorTitle = exception.Title;
               return_response.ErrorDetail = exception.Detail;
               return_response.ErrorType = exception.Type;
               return_response.ErrorInstance = exception.Instance;
               return_response.ErrorList.push(exception.error.ResponseMessage)
            }
            // Status 0 when can't communicate with the API, we do a PING to the API just to confirm and send back relevent message.
            else if (exception.status == 0) {
               return_response.ErrorList.push(exception.message);
               return_response.ErrorList.push(await this.ping_api_message());
            }
            else {
               return_response.ErrorList.push("Unknown Http Error");
            }
         }
         // Any other exceptions we just add to the error list
         else {
            return_response.ErrorList.push(exception.message);
         }

      }
      catch (e: any) {
         return_response.ErrorList.push(e.Message);
      }

      return return_response;
   }
}