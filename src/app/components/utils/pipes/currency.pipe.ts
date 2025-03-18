import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customCurrency",
})
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number, currencyCode = "ZAR", locale = "en-ZA"): string {
    if (value == null) return "";

    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
    }).format(value);
  }
}
