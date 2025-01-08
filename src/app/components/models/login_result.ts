//Model for when the user logs in.
export class LoginResultModel {

   SessionToken?: string;

   // Admin - WR01 
   // CustomerServiceAgent - WR02
   RoleCode?: string[];

   AccessKey?: string;
   ResponseMessage: string = 'Login Successful';

   Success: boolean = this.ResponseMessage == 'Login Successful' ? true : false;

   Email?: string;

   constructor() { }
}

