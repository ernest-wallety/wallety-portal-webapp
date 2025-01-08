import { LoginResultModel } from "../models/login_result";
import { ConfigHelper } from "./config_helper";

export class AuthenticationHelper {
   // Check if the user is logged in.
   public static is_logged_in() {
      return this.get_user_detail().Success!;
   }

   // Gets the information about the logged in user and converts it to a LoginResultModel
   public static get_user_detail() {
      try {
         var json_object = JSON.parse(
            localStorage.getItem(ConfigHelper.USER_STORAGE_NAME)!,
         );

         return json_object as LoginResultModel;
      } catch (e) {
         console.error(e);

         return Object.assign(new LoginResultModel(), {
            Success: false,
            ResponseMessage:
               'An error has occurred, please review the console for more information.',
         });
      }
   }

   // Set the local storage, generally should only happen after the user has logged in successfully.
   public static set_user_localstorage(user_detail: LoginResultModel) {
      localStorage.setItem(ConfigHelper.USER_STORAGE_NAME, JSON.stringify(user_detail));
   }

   // Clear storage, good for logging out.
   public static clear_user_localstorage() {
      localStorage.clear();
   }
}
