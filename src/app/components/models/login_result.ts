//Model for when the user logs in.
export class LoginResultModel {

   ResponseMessage: string;

   SessionToken?: string;

   RoleCodes?: RoleCodeModel[];

   Success: boolean;

   Email?: string;

   constructor() {
      this.ResponseMessage = 'Login Successful';
      this.Success = this.ResponseMessage == 'Login Successful' ? true : false;
   }
}

// Admin - WR01 
// CustomerServiceAgent - WR02
// Customer - WR03
export class RoleCodeModel {
   Role?: string;
   Code?: string;
   IsDefault?: boolean
}