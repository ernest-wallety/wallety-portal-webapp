export class UserDetailsModel {
  Name = "";
  FirstName = "";
  Surname = "";
  Email?: string;
  IdNumber?: string;
  PassportNumber?: string;
  IdentityImage = "";
  AccountNumber = "";
  AccountCreationDate?: Date;
  IsAccountActive = true;
  CommunicationConsent?: boolean;
  VerifyAttempts = 3;
  IsFrozen = false;
  IsVerified = false;

  PhoneNumber?: string;
  PanicCode = "";

  DisplayNumber?: string;

  OneTimePasswordGuid?: string;
  ProfileImage?: string;
}
