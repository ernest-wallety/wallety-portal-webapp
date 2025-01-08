export class ConfigHelper {
   /**
    * Base URL for API requests.
    * This value is retrieved from environment variables or defaults to an empty string.
    */

   public static API_URL: string = import.meta.env["API_URL"];
   public static USER_STORAGE_NAME: string = import.meta.env["USER_STORAGE_NAME"]
}
