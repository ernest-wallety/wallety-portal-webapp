import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "emailValidator",
})
export class EmailValidatorPipe implements PipeTransform {
  transform(value: string): boolean {
    if (!value) {
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(value);
  }
}
