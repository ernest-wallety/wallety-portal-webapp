import { Injectable } from "@angular/core";
import moment from "moment";
import { DateRangeModel } from "../models/date_range_model";
import { LookupModel } from "../models/lookup_model";

@Injectable()
export class LookupHelper {
  // ==============================================================================================================================
  // Implementation of Lookup Methods (check for implementation examples on client-user-list, user-edit and notification-list)
  // ==============================================================================================================================

  // Saves the state of the lookups list - without ever being overwrriten, except when initialised.
  public static lookups: LookupModel[] = [];

  // Pushes all the lookup dropdowns from an angular component to an array object (of type Lookup). Identifier = Field name on Primary Table (Main List Table)
  public static initialiseLookup(listFieldName: string) {
    this.lookups.push({
      name: this.transform(listFieldName),
      id: null,
      idArr: [],
    });
  }

  public static onChangeLookup(
    lookup: LookupModel,
    listFieldName: string,
  ): string {
    // Find item index in the component's lookup list with corresponding field name.

    const index = this.lookups.findIndex(
      (item) => item.name === this.transform(listFieldName),
    );

    if (index !== -1) {
      // If item is found in the list then...

      // Assign the id to the corresponding lookup record.
      this.lookups[index].id = `'${lookup.id}'`;

      // Return new encoded json string with the all the lookups on the component appropriately populated.
      return encodeURIComponent(JSON.stringify(this.lookups));
    } else {
      console.warn("Lookup not found in array.");
      return "";
    }
  }

  // A means to populate lookup string parameter, from a multi lookup which controls an int array.
  // There may be a more elegant way to override this change lookup function, but for now I am leaving it here as a separate function as to separate responsibility.
  public static onChangeMultiLookup(
    multiLookup: LookupModel[],
    listFieldName: string,
  ): string {
    // Find item index in the component's lookup list with corresponding field name.
    const index = this.lookups.findIndex((item) => {
      const isMatch = item.name === this.transform(listFieldName);

      return isMatch;
    });

    if (index !== -1) {
      // If item is found in the list then...

      // Assign the array of id's to the corresponding lookup record.
      this.lookups[index].idArr = [];

      multiLookup.forEach((part) => {
        this.lookups[index].idArr.push(part.id ?? 0);
      });

      // Return new encoded json string with the all the lookups on the component appropriately populated.
      return encodeURIComponent(JSON.stringify(this.lookups));
    } else {
      console.log("Lookup not found in array.");
      return "";
    }
  }

  // ====================================================================================
  // Date Search Criteria Methods
  // ====================================================================================

  public static rangeArr: DateRangeModel[] = [];

  public static initialiseDateRange(listFieldName: string) {
    this.rangeArr.push({
      name: this.transform(listFieldName),
      startDate: null,
      endDate: null,
      isOnChange: false,
      isOnClear: false,
      isRange: true,
    });
  }

  public static onChangeDateRange(range: any, listFieldName: string) {
    // Find item index in the component's lookup list with corresponding field name.
    const index = this.rangeArr.findIndex(
      (item) => item.name === this.transform(listFieldName),
    );

    if (index !== -1) {
      // If item is found in the list then...

      this.rangeArr[index] = this.setSearchByDateBehaviour(
        this.rangeArr[index],
        true,
        false,
        true,
      );

      this.rangeArr[index] = this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        range,
      );

      // Return new encoded json string with the all the lookups on the component appropriately populated.
      return encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log("Range not found in array.");
      return "";
    }
  }

  public static async onClearDateRange(listFieldName: string) {
    // Find item index in the component's range list with corresponding field name.
    const index = this.rangeArr.findIndex(
      (item) => item.name === this.transform(listFieldName),
    );

    if (index !== -1) {
      // If item is found in the list then...

      this.rangeArr[index] = this.setSearchByDateBehaviour(
        this.rangeArr[index],
        false,
        true,
        true,
      );

      this.rangeArr[index] = this.setSearchByDateCriteriaValues(
        this.rangeArr[index],
        { startDate: null, endDate: null },
      );

      // Return new encoded json string with the all the ranges on the component appropriately populated.
      return encodeURIComponent(JSON.stringify(this.rangeArr));
    } else {
      console.log("Range not found in array.");
      return "";
    }
  }

  private static setSearchByDateBehaviour(
    range: DateRangeModel = new DateRangeModel(),
    isOnChange = false,
    isOnClear = false,
    isRange = false,
  ): DateRangeModel {
    range.isOnChange = isOnChange;
    range.isOnClear = isOnClear;
    range.isRange = isRange;

    return range;
  }

  private static setSearchByDateCriteriaValues(
    oldRange: DateRangeModel = new DateRangeModel(),
    newRange: any,
  ): DateRangeModel {
    if (oldRange.isOnClear == false) {
      oldRange.startDate = newRange.startDate ?? moment(newRange);
      oldRange.endDate = newRange.endDate ?? moment(newRange);
    } else {
      oldRange.startDate = null;
      oldRange.endDate = null;
    }
    return oldRange;
  }

  // ====================================================================================
  // Helper Methods
  // ====================================================================================

  public static transform(value: string): string {
    if (!value) return "";
    const split = value.split(".");
    return `${split[0]}.'${split[1]}'`;
  }
}
