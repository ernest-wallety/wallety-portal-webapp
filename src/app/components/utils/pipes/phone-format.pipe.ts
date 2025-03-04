import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phoneFormat",
})
export class PhoneFormatPipe implements PipeTransform {
  transform(phoneNumber: string | null, mobileRegex?: string): string {
    if (!phoneNumber) {
      return "Not available";
    }

    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Validate the number using the provided regex, if available
    if (mobileRegex) {
      const regex = new RegExp(mobileRegex);
      if (!regex.test(cleaned)) {
        return "Invalid Number";
      }
    }

    // Format the phone number by splitting into groups
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");

    return formatted;
  }
}
