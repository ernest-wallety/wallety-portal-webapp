export class ConfigHelper {
   /**
    * Base URL for API requests.
    * This value is retrieved from environment variables or defaults to an empty string.
    */

   public static NG_APP_API_URL: string = import.meta.env["NG_APP_API_URL"];
   public static NG_APP_USER_STORAGE_NAME: string = import.meta.env["NG_APP_USER_STORAGE_NAME"];

   public static NG_APP: string = import.meta.env["NG_APP"];
   public static NG_APP_NAME: string = import.meta.env["NG_APP_NAME"];

   public static NODE_ENV: string = import.meta.env["NODE_ENV"];

}
