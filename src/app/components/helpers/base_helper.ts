export class BaseHelper {
   /**
   * Determines if the current environment is a browser.
   * This helps differentiate between browser and server-side execution.
   * @returns {boolean} True if running in a browser environment, otherwise false.
   */
   public static is_browser(): boolean {
      return typeof window !== "undefined" && typeof localStorage !== "undefined";
   }

   /**
    * Clear user details from localStorage. Only works in a browser environment.
    */
   public static clear_user_localstorage(): void {
      if (!this.is_browser()) {
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