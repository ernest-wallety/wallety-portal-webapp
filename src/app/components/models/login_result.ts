//Model for when the user logs in.
export class LoginResultModel {

   ResponseMessage: string;

   SessionToken?: string;

   RoleCodes?: RoleCodeModel[];

   Success: boolean;

   User?: UserDetailsModel;

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

export class UserDetailsModel {
   Name = '';
   Surname = '';
   Email?: string;
   IdNumber?: string;
   PassportNumber?: string;
   IdentityImage = '';
   AccountNumber = '';
   AccountCreationDate?: Date;
   IsAccountActive = true;
   CommunicationConsent?: boolean;
   VerifyAttempts = 3;
   IsFrozen = false;
   IsVerified = false;

   PhoneNumber?: string;
   PanicCode = '';

   DisplayNumber?: string;
}
