import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "displayName",
  pure: true,
})
export class DisplayNamePipe implements PipeTransform {
  transform(user: any): string {
    return user ? `${user.FirstName || ""} ${user.Surname || ""}`.trim() : "";
  }
}
