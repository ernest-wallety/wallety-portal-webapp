import { isPlatformBrowser } from "@angular/common";
import { Inject, PLATFORM_ID } from "@angular/core";

export class BaseHelper {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  /**
   * Determines if the current environment is a browser.
   * This helps differentiate between browser and server-side execution.
   * @returns {boolean} True if running in a browser environment, otherwise false.
   */
  public static is_browser(platformId: object): boolean {
    return isPlatformBrowser(platformId);
  }

  /**
   * Clear user details from localStorage. Only works in a browser environment.
   */
  public static clear_user_localstorage(platformId: object): void {
    if (!BaseHelper.is_browser(platformId)) {
      console.warn("Attempted to clear localStorage in a server environment.");
      return;
    }

    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }
}
