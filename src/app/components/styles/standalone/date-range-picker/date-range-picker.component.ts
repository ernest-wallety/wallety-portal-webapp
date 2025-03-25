import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import moment, { Moment } from "moment";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { DateRange } from "../../../models/date_range";

@Component({
  selector: "app-date-range-picker",
  templateUrl: "./date-range-picker.component.html",
  styleUrls: ["./date-range-picker.component.css"],
  standalone: true,
  imports: [CommonModule, FormsModule, NgxDaterangepickerMd],
})
export class DateRangePickerComponent
  extends AuthenticatedBaseComponent
  implements OnInit
{
  // Variables

  // Input
  @Input() DateRange: DateRange | null = null;
  @Input() Opens = "left"; // left right center
  @Input() Drops = "down";
  @Input() AlwaysShowCalendar = true;
  @Input() LinkedCalendars = true;

  @Input() ShowSearch = false;
  @Input() ShowClear = false;

  @Input() Placeholder = "Choose Date";
  @Input() width = "auto";

  //Output
  @Output() OnInitEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() DateChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnSearchEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnClearEmitter: EventEmitter<any> = new EventEmitter<any>();

  public ranges: any = {
    "Last 7 Days": [moment().subtract(6, "days"), moment()],
    "Last 30 Days": [moment().subtract(30, "days"), moment()],
    "This Month": [
      moment().startOf("month"),
      moment().startOf("month").add(1, "month"),
    ],
    "Last Month": [
      moment().subtract(1, "month").startOf("month"),
      moment().startOf("month"),
    ],
    "Last 3 months": [
      moment().startOf("month").subtract(3, "month").startOf("month"),
      moment().startOf("month"),
    ],
    "Last 6 months": [
      moment().startOf("month").subtract(6, "month").startOf("month"),
      moment().startOf("month"),
    ],
  };

  ngOnInit() {
    this.OnInitEmitter.emit();
  }

  setDateRange(startDate: Moment, endDate: Moment) {
    this.DateRange = new DateRange();
    this.DateRange.startDate = moment(startDate);
    this.DateRange.endDate = moment(endDate);
  }

  changeEvent(changeEvent: any) {
    console.log(changeEvent);

    this.DateChangeEvent.emit(this.DateRange);
    this.OnSearchEmitter.emit(this.DateRange);
  }

  searchClick() {
    if (this.OnSearchEmitter != null) {
      this.OnSearchEmitter.emit(this.DateRange);
    }
  }

  clearClick() {
    if (this.OnClearEmitter != null) {
      this.DateRange = null;
      this.OnClearEmitter.emit(null);
    }
  }
}
