import { Inject, PLATFORM_ID } from '@angular/core';
import { MenuListModel } from "../models/menu_model";
import { BaseHelper } from "./base_helper";
import { ConfigHelper } from "./config_helper";

export class MenuHelper extends BaseHelper {
   constructor(@Inject(PLATFORM_ID) platformId: object) {
      super(platformId); // Pass platformId to the parent constructor
   }

   /**
       * Set user details in localStorage. Only works in a browser environment.
       */
   public static set_menu_localstorage(menu_detail: MenuListModel, platformId: object): void {
      if (!BaseHelper.is_browser(platformId)) {
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
   public static get_menu_detail(platformId: object): MenuListModel {
      if (!BaseHelper.is_browser(platformId)) {
         // Default value for server-side environment.
         return new MenuListModel();
      }

      try {
         const jsonString = localStorage.getItem(ConfigHelper.NG_APP_MENU_STORAGE_NAME);

         if (!jsonString) {
            return new MenuListModel();
         }

         const jsonObject = JSON.parse(jsonString);

         return jsonObject as MenuListModel;
      } catch (error) {
         console.error("Error parsing menu detail from localStorage:", error);

         return new MenuListModel();
      }
   }

   public static is_menu_stored(platformId: object): boolean {
      if (!BaseHelper.is_browser(platformId)) {
         return false; // localStorage is not available on the server
      }

      return localStorage.getItem(ConfigHelper.NG_APP_MENU_STORAGE_NAME) !== null;
   }
}
