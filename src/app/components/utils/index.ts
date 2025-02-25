export class Utils {
  public static get_current_year(): number {
    return new Date().getFullYear();
  }

  public static lookup_converter(
    items: any[] | undefined | null,
    idField: string,
    nameField: string,
  ): any[] {
    // Add null/undefined check
    if (!items) {
      return [];
    }

    return items.map((item: any) => {
      return {
        Id: item[idField],
        Name: item[nameField],
      };
    });
  }
}
