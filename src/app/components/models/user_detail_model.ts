export class UserDetailsModel {
  name = "";
  firstName = "";
  surname = "";
  email?: string;
  idNumber?: string;
  passportNumber?: string;
  identityImage = "";
  accountNumber = "";
  accountCreationDate?: Date;
  isAccountActive = true;
  communicationConsent?: boolean;
  verifyAttempts = 3;
  isFrozen = false;
  isVerified = false;

  phoneNumber?: string;
  panicCode = "";

  displayNumber?: string;

  oneTimePasswordGuid?: string;
  profileImage?: string;
}
