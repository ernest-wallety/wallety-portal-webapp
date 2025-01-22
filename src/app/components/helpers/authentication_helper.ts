import { LoginResultModel } from "../models/login_result";
import { ConfigHelper } from "./config_helper";

export class AuthenticationHelper {
   /**
    * Check if the user is logged in.
    */
   public static is_logged_in(): boolean {
      const userDetail = this.get_user_detail();
      return userDetail ? userDetail.Success! : false;
   }

   /**
   * Get the information about the logged-in user and convert it to a LoginResultModel.
   * Returns a default value if not running in a browser.
   */
   public static get_user_detail(): LoginResultModel {
      if (!this.isBrowser()) {
         // Default value for server-side environment.
         return Object.assign(new LoginResultModel(), {
            Success: false,
            ResponseMessage: 'No user detail available in server environment.',
         });
      }

      try {
         const jsonString = localStorage.getItem(ConfigHelper.NG_APP_USER_STORAGE_NAME);

         if (!jsonString) {
            return Object.assign(new LoginResultModel(), {
               Success: false,
               ResponseMessage: "No user data found in localStorage.",
            });
         }

         const jsonObject = JSON.parse(jsonString);

         return jsonObject as LoginResultModel;
      } catch (error) {
         console.error("Error parsing user detail from localStorage:", error);

         return Object.assign(new LoginResultModel(), {
            Success: false,
            ResponseMessage: "Error occurred while reading user data."
         });
      }
   }

   /**
    * Set user details in localStorage. Only works in a browser environment.
    */
   public static set_user_localstorage(user_detail: LoginResultModel): void {
      if (!this.isBrowser()) {
         console.warn("Attempted to set localStorage in a server environment.");
         return;
      }

      try {
         localStorage.setItem(ConfigHelper.NG_APP_USER_STORAGE_NAME, JSON.stringify(user_detail));
      } catch (error) {
         console.error("Error setting localStorage:", error);
      }
   }

   /**
    * Clear user details from localStorage. Only works in a browser environment.
    */
   public static clear_user_localstorage(): void {
      if (!this.isBrowser()) {
         console.warn("Attempted to clear localStorage in a server environment.");
         return;
      }

      try {
         localStorage.removeItem(ConfigHelper.NG_APP_USER_STORAGE_NAME);
      } catch (error) {
         console.error("Error clearing localStorage:", error);
      }
   }

   /**
    * Utility method to determine if the current environment is a browser.
    */
   private static isBrowser(): boolean {
      return typeof window !== "undefined" && typeof localStorage !== "undefined";
   }
}
