import { NgFor, NgIf } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ListCriteria } from "../../../models/_base_list_criteria";

@Component({
  selector: "app-paging",
  templateUrl: "./paging.component.html",
  styleUrls: ["./paging.component.scss"],
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
})
export class PagingComponent {
  // Output to be deprecated.
  @Output() PagingEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() UpdateCriteriaEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() ListRef: any;

  public PageOptions: number[] = [10, 25, 50, 100];
  @Input() RecordTotal: number = 0;
  @Input() criteria: ListCriteria = ListCriteria.default();
  @Input() DisableNext: boolean = false;

  ngOnInit(): void {
    console.log(this.RecordTotal);
  }

  next() {
    if (!this.DisableNext) {
      this.criteria.pageIndex++;
      this.emitPageSubmit();
    } else {
      this.validateNextPage();
    }
  }

  previous() {
    if (this.criteria.pageIndex > 1) {
      this.criteria.pageIndex--;
      this.emitPageSubmit();
    }
  }

  emitPageSubmit() {
    this.PagingEmitter.emit(this.criteria);
  }

  OnPageSizeChange() {
    this.emitPageSubmit();
  }

  validateNextPage() {
    // Disallows navigation to next page if there are no records ***Requires RecordTotal

    if (this.RecordTotal > (this.criteria.pageSize * this.criteria.pageIndex)) {
      this.criteria.pageIndex++;
      this.emitPageSubmit();
    }
  }
}
