import { Inject, PLATFORM_ID } from "@angular/core";
import { LoginResultModel, RoleCodeModel } from "../models/login_result";
import { BaseHelper } from "./base_helper";
import { ConfigHelper } from "./config_helper";

export class AuthenticationHelper extends BaseHelper {
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    super(platformId); // Pass platformId to the parent constructor
  }

  /**
   * Set user details in localStorage. Only works in a browser environment.
   */
  public static set_user_localstorage(
    user_detail: LoginResultModel,
    platformId: object,
  ): void {
    if (!BaseHelper.is_browser(platformId)) {
      console.warn("Attempted to set localStorage in a server environment.");
      return;
    }

    try {
      localStorage.setItem(
        ConfigHelper.NG_APP_USER_STORAGE_NAME,
        JSON.stringify(user_detail),
      );
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }

  /**
   * Get the information about the logged-in user and convert it to a LoginResultModel.
   * Returns a default value if not running in a browser.
   */
  public static get_user_detail(platformId: object): LoginResultModel {
    if (!BaseHelper.is_browser(platformId)) {
      // Default value for server-side environment.
      return Object.assign(new LoginResultModel(), {
        Success: false,
        ResponseMessage: "No user detail available in server environment.",
      });
    }

    try {
      const jsonString = localStorage.getItem(
        ConfigHelper.NG_APP_USER_STORAGE_NAME,
      );

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
        ResponseMessage: "Error occurred while reading user data.",
      });
    }
  }

  public static is_user_detail_stored(platformId: object): boolean {
    return (
      this.get_user_detail(platformId).User.Email !== null ||
      this.get_user_detail(platformId).User.Email !== undefined
    );
  }

  /**
   * Checks if the user is logged in.
   * @returns {boolean} True if the user is logged in, otherwise false.
   */
  public static is_logged_in(platformId: object): boolean {
    const userDetail = this.get_user_detail(platformId);
    return userDetail ? userDetail.Success! : false;
  }

  /**
   * Retrieves all roles assigned to the user.
   * @returns {RoleCodeModel[] | undefined} An array of role objects or undefined if no roles exist.
   */
  private static role_codes(platformId: object): RoleCodeModel[] | undefined {
    const roleDetail = this.get_user_detail(platformId).RoleCodes;
    return roleDetail;
  }

  /**
   * Checks if the user has an "ADMIN" role and if it is the default role.
   * @returns {boolean} True if the user has an "ADMIN" role and it is default, otherwise false.
   */
  public static is_admin(platformId: object): boolean {
    const roles = this.role_codes(platformId);
    return (
      roles?.some((role) => role.Code === "WR01" && role.IsDefault) ?? false
    );
  }

  /**
   * Checks if the user has a "CUSTOMER" role and if it is the default role.
   * @returns {boolean} True if the user has a "CUSTOMER" role and it is default, otherwise false.
   */
  public static is_customer(platformId: object): boolean {
    const roles = this.role_codes(platformId);
    return (
      roles?.some((role) => role.Code === "WR03" && role.IsDefault) ?? false
    );
  }

  /**
   * Checks if the user has a "CUSTOMERSERVICEAGENT" role and if it is the default role.
   * @returns {boolean} True if the user has a "CUSTOMERSERVICEAGENT" role and it is default, otherwise false.
   */
  public static is_service_agent(platformId: object): boolean {
    const roles = this.role_codes(platformId);
    return (
      roles?.some((role) => role.Code === "WR02" && role.IsDefault) ?? false
    );
  }
}
