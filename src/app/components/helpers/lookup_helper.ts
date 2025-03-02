import { Injectable } from "@angular/core";
import { Lookup } from "../models/lookup";

@Injectable()
export class LookupHelper {
  // Saves the state of the lookups list - without ever being overwrriten, except when initialised.
  public static lookups: Array<Lookup> = new Array<Lookup>();

  // Pushes all the lookup dropdowns from an angular component to an array object (of type Lookup). Identifier = Field name on Primary Table (Main List Table)
  public static initialiseLookup(listFieldName: string) {
    this.lookups.push({
      name: listFieldName,
      id: null,
      IdArr: [],
    });
  }

  public static onChangeLookup(lookup: Lookup, listFieldName: string): string {
    //MP: find item index in the component's lookup list with corresponding field name.
    let index = this.lookups.findIndex((item) => item.name === listFieldName);

    if (index !== -1) {
      // if item is found in the list then...

      // Assign the id to the corresponding lookup record.
      this.lookups[index].id = lookup?.id;

      // Return new encoded json string with the all the lookups on the component appropriately populated.
      return encodeURIComponent(JSON.stringify(this.lookups));
    } else {
      console.warn("Lookup not found in array.");
      return "";
    }
  }
}
