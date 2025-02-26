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

  // New function to determine the appropriate RoleCode
  public static get_role_code(roles: any[]): any {
    if (roles.length === 1) {
      return roles[0];
    } else {
      const defaultRole = roles.find((role) => role.isDefault);
      return defaultRole || roles[0]; // Return defaultRole if found, else return the first role
    }
  }
}
