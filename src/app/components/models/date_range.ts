import { Moment } from "moment";

export class DateRange {
  name!: string;
  startDate?: Moment | null;
  endDate?: Moment | null;
  isOnClear = false;
  isOnChange = false;
  isRange = true;
}
