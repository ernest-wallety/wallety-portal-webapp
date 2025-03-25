import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { LookupHelper } from "../../../helpers/lookup_helper";
import { ListCriteria } from "../../../models/_base_list_criteria";
import { Lookup } from "../../../models/lookup";
import { SelectSingleLookupComponent } from "../select-single-lookup/select-single-lookup.component";

@Component({
  selector: "app-filter-slider",
  standalone: true,
  imports: [CommonModule, RouterModule, SelectSingleLookupComponent],
  templateUrl: "./filter-slider.component.html",
  styleUrls: ["./filter-slider.component.scss"],
})
export class FilterSliderComponent
  extends AuthenticatedBaseComponent
  implements OnInit
{
  public modalDialog?: NgbModalRef;

  @Input() title?: string;

  isInit = false;
  hideSidebar = true;

  @Input() showFilters = true;
  @Input() showSimColumns = true;
  @Input() showMonthlyColumns = true;
  @Input() showSorting = true;
  @Input() showBundleColumn = false;

  segments: any;

  @Output() OnChangeEmitter: EventEmitter<ListCriteria> =
    new EventEmitter<ListCriteria>();

  ngOnInit(): void {
    this.isInit = true;
  }

  showSlider() {
    this.hideSidebar = false;
    const $slider = document.getElementById("filter-slider");
    const isClosed = $slider?.classList.contains("slide-in") ?? false;

    if (isClosed == true) {
      $slider?.setAttribute("class", "slide-out");
    }

    return false;
  }

  hideSlider() {
    const $slider = document.getElementById("filter-slider");
    $slider?.setAttribute("class", "slide-in");

    this.OnChangeEmitter.emit();
  }

  toggleShowSlider() {
    const $slider = document.getElementById("filter-slider");
    const isClosed = $slider?.classList.contains("slide-in");

    if (isClosed == true) {
      $slider?.setAttribute("class", "slide-out");
    } else {
      $slider?.setAttribute("class", "slide-in");
    }
  }

  applyClick() {
    this.OnChangeEmitter.emit(this.Criteria);
    this.hideSlider();
  }

  initialiseLookup(listFieldName: string) {
    LookupHelper.initialiseLookup(listFieldName);
  }

  public async onChangeLookup(lookup: Lookup, listFieldName: string) {
    this.Criteria.lookups =
      lookup != undefined
        ? LookupHelper.onChangeLookup(lookup, listFieldName)
        : "";

    this.OnChangeEmitter.emit(this.Criteria);
  }
}
