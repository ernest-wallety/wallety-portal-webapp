import { MenuModel } from "../models/menu_model";
import { BaseHelper } from "./base_helper";
import { ConfigHelper } from "./config_helper";

export class MenuHelper extends BaseHelper {
   /**
       * Set user details in localStorage. Only works in a browser environment.
       */
   public static set_menu_localstorage(menu_detail: MenuModel): void {
      if (!this.is_browser()) {
         console.warn("Attempted to set localStorage in a server environment.");
         return;
      }

      try {
         localStorage.setItem(ConfigHelper.NG_APP_MENU_STORAGE_NAME, JSON.stringify(menu_detail));
      } catch (error) {
         console.error("Error setting localStorage:", error);
      }
   }

   /**
      * Get the information about the logged-in user and convert it to a LoginResultModel.
      * Returns a default value if not running in a browser.
      */
   public static get_menu_detail(): MenuModel {
      if (!this.is_browser()) {
         // Default value for server-side environment.
         return new MenuModel();
      }

      try {
         const jsonString = localStorage.getItem(ConfigHelper.NG_APP_MENU_STORAGE_NAME);

         if (!jsonString) {
            return new MenuModel();
         }

         const jsonObject = JSON.parse(jsonString);

         return jsonObject as MenuModel;
      } catch (error) {
         console.error("Error parsing menu detail from localStorage:", error);

         return new MenuModel();
      }
   }

}