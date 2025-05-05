import { UserDetailsModel } from "./user_detail_model";

//Model for when the user logs in.
export class LoginResultModel {
  responseMessage?: string;

  roleCodes?: RoleCodeModel[];

  success?: boolean;

  user: UserDetailsModel = new UserDetailsModel();

  sessionToken?: string;

  email?: string;
  username?: string;
  expireDate?: string;
  role?: string;
  timeStamp?: number;
}

// Admin - WR01
// CustomerServiceAgent - WR02
// Customer - WR03
export class RoleCodeModel {
  roleId?: string;
  roleName?: string;
  roleCode?: string;
  isDefault?: boolean;
}
