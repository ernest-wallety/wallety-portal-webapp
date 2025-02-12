import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {
   transform(phoneNumber: string | null): string {
      if (!phoneNumber) {
         return 'Not available';
      }

      // Remove any non-digit characters
      const cleaned = phoneNumber.replace(/\D/g, '');

      // Check if it's a valid length for international phone number
      if (cleaned.length < 10 || cleaned.length > 15) {
         return phoneNumber; // Return original if invalid
      }

      // Format for international numbers (WhatsApp format)
      // Assuming format: +XX XXX XXX XXXX
      const countryCode = cleaned.slice(0, 2);
      const firstPart = cleaned.slice(2, 5);
      const secondPart = cleaned.slice(5, 8);
      const lastPart = cleaned.slice(8);

      return `+${countryCode} ${firstPart} ${secondPart} ${lastPart}`;
   }
}