import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  forwardRef,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { NgSelectComponent, NgSelectModule } from "@ng-select/ng-select";
import { Observable } from "rxjs";
import { BaseComponent } from "../../../base/base.component";

@Component({
  selector: "app-select-multi-lookup",
  templateUrl: "./select-multi-lookup.component.html",
  styleUrls: ["./select-multi-lookup.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMultiLookupComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class SelectMultiLookupComponent
  extends BaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  model: any = { Id: 0 };
  @Input() BindLabel = "name";
  @Input() BindValue = "id";
  @Input() ApiMethod = "";
  @Input() Name = "";
  @Input() addTag = false;

  @Input() clearable = true;

  @Input() disabled = false;
  @Input() groupBy?: string;
  @Input() filterId?: string;
  @Input() appendTo?: string;

  @Input() width = "auto";

  @Input() openOnInit = false;

  @Input() showCountsOnly = false;

  @Input() Items!: any;

  val!: Observable<any[]> | null;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Output() OnChangeEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed
  @Output() OnBlurEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed

  ngOnInit() {
    if (this.Items == null) {
      this.loadItems();
    }
  }

  ngAfterViewInit() {
    if (this.openOnInit) {
      this.ngSelect.open();
    }
  }

  async loadItems() {
    if (this.Items == null) {
      const response = await this.get_async_call_no_params(
        "/Lookup/" + this.ApiMethod,
      );

      if (!response.IsError) {
        this.Items = response.Data.Items;
      }
    }
  }

  onChange: any = () => {
    // Default implementation
  };

  onTouched: any = () => {
    // Implement your logic here or remove if not needed
  };

  get value() {
    return this.val;
  }

  set value(val) {
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(newValue: any) {
    if (newValue != null) {
      this.value = newValue;
    } else {
      this.value = null;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  onValueChange($event: any) {
    this.onChange(this.val);
    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit($event);
    }
  }

  onBlur($event: any) {
    this.OnBlurEmitter.emit($event);
  }

  customSearchFn(term: string, item: any) {
    if (term != null) {
      term = term.toLowerCase();
      let found = false;

      if (item.groupBy != null) {
        found = item.groupBy.toLowerCase().indexOf(term) > -1;
      }

      if (!found) {
        if (item.name != null) {
          found = item.name.toLowerCase().indexOf(term) > -1;
        }
      }

      return found;
    }

    return false;
  }
}
