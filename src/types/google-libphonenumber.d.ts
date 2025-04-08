declare module "google-libphonenumber" {
  export enum PhoneNumberFormat {
    E164,
    INTERNATIONAL,
    NATIONAL,
    RFC3966,
  }

  export enum PhoneNumberType {
    FIXED_LINE,
    MOBILE,
    FIXED_LINE_OR_MOBILE,
    TOLL_FREE,
    PREMIUM_RATE,
    SHARED_COST,
    VOIP,
    PERSONAL_NUMBER,
    PAGER,
    UAN,
    VOICEMAIL,
    UNKNOWN,
  }

  export class PhoneNumberUtil {
    static getInstance(): PhoneNumberUtil;

    getExampleNumberForType(
      regionCode: string,
      phoneNumberType: PhoneNumberType,
    ): PhoneNumber;

    format(phoneNumber: PhoneNumber, format: PhoneNumberFormat): string;
  }

  export class PhoneNumber {
    // You can optionally define methods here
  }
}
