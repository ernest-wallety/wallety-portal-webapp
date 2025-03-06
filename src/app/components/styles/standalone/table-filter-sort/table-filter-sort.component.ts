import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";

@Component({
  selector: "app-sort",
  templateUrl: "./table-filter-sort.component.html",
  styleUrls: ["./table-filter-sort.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class TableFilterSortComponent {
  @Input() sortField: string | null = null;
  @Input() sortAscending: boolean | null = false;

  @Output() OnClick: EventEmitter<any> = new EventEmitter<any>();

  onClick($event: any) {
    console.log($event);

    this.sortAscending = !this.sortAscending;

    this.OnClick.emit({
      sortField: this.sortField,
      sortAscending: this.sortAscending,
    });

    return false;
  }
}
