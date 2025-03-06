import { Pipe, PipeTransform } from "@angular/core";
import { ExtensionMethods } from "../../helpers/extension_methods";

@Pipe({
  name: "convertImage",
  pure: true, // Ensures it updates only when input changes
})
export class ConvertImagePipe implements PipeTransform {
  transform(img: string | null | undefined): string | undefined {
    return img ? ExtensionMethods.to_base_64_image(img) : undefined;
  }
}
