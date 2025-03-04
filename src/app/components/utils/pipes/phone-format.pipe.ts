import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneFormat",
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string | null, mobileRegex: string): string {
    if (!phoneNumber) {
      return "Not available";
    }

    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Use the mobileRegex to validate the number
    const regex = new RegExp(mobileRegex); // Use the provided MobileRegex
    if (!regex.test(cleaned)) {
      return "Invalid Number"; // If it doesn't match the regex, return invalid
    }

    // Format the phone number by splitting into groups
    // Assuming a format based on the length of the cleaned number
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");

    return formatted;
  }
}
