import { LoginResultModel } from "../models/login_result";
import { ConfigHelper } from "./config_helper";

export class AuthenticationHelper {
   // Check if the user is logged in.
   public static is_logged_in(): boolean {
      const userDetail = this.get_user_detail();
      return userDetail ? userDetail.Success! : false;
   }

   // Gets the information about the logged-in user and converts it to a LoginResultModel.
   public static get_user_detail(): LoginResultModel {
      if (!this.isBrowser()) {
         // Return a default value for non-browser environments.
         return Object.assign(new LoginResultModel(), {
            Success: false,
            ResponseMessage: 'No user detail available in server environment.',
         });
      }

      try {
         const jsonObject = JSON.parse(
            localStorage.getItem(ConfigHelper.USER_STORAGE_NAME) || '{}',
         );

         return jsonObject as LoginResultModel;
      } catch (e) {
         console.error('Error parsing user detail from localStorage:', e);

         return Object.assign(new LoginResultModel(), {
            Success: false,
            ResponseMessage:
               'An error has occurred, please review the console for more information.',
         });
      }
   }

   // Set the local storage, generally should only happen after the user has logged in successfully.
   public static set_user_localstorage(user_detail: LoginResultModel): void {
      if (!this.isBrowser()) {
         console.warn('Attempted to set localStorage in a server environment.');
         return;
      }

      localStorage.setItem(ConfigHelper.USER_STORAGE_NAME, JSON.stringify(user_detail));
   }

   // Clear storage, good for logging out.
   public static clear_user_localstorage(): void {
      if (!this.isBrowser()) {
         console.warn('Attempted to clear localStorage in a server environment.');
         return;
      }

      localStorage.clear();
   }

   // Utility to check if the current environment is a browser.
   private static isBrowser(): boolean {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
   }
}
