export class ExtensionMethods {
  public static is_success_status(statusCode: number) {
    const errorStatusCodes = [200, 201, 202, 302];
    return errorStatusCodes.includes(statusCode);
  }

  public static is_error_status(statusCode: number) {
    const errorStatusCodes = [400, 404, 401, 424, 403, 501, 409];
    return errorStatusCodes.includes(statusCode);
  }

  // New method to convert a base64 string to an image URL
  public static to_base_64_image(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
