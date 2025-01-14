//Model for when the user logs in.
export class LoginResultModel {

   ResponseMessage: string = 'Login Successful';

   SessionToken?: string;

   RoleCodes?: RoleCodeModel[];

   Success: boolean = this.ResponseMessage == 'Login Successful' ? true : false;

   Email?: string;

   constructor() { }
}

// Admin - WR01 
// CustomerServiceAgent - WR02
export class RoleCodeModel {
   Role?: string;
   Code?: string;
   IsDefault?: boolean
}