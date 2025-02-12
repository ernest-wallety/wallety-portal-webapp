export class Utils {
   public static get_current_year(): number {
      return new Date().getFullYear();
   }

   public static lookup_converter(items: any[], idField: string, nameField: string): any[] {
      return items.map((item: any) => {
         return {
            Id: item[idField],
            Name: item[nameField]
         };
      });
   }
}