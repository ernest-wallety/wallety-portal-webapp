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
import { BaseComponent } from "../../../base/base.component";

@Component({
  selector: "app-select-single-lookup",
  templateUrl: "./select-single-lookup.component.html",
  styleUrls: ["./select-single-lookup.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSingleLookupComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class SelectSingleLookupComponent
  extends BaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  model: any = { Id: 0 };
  @Input() BindLabel = "name";
  @Input() BindValue = "id";
  @Input() ApiMethod = "";
  @Input() Name = "";

  @Input() clearable = true;

  @Input() disabled = false;
  @Input() groupBy = "";
  @Input() filterId = null;
  @Input() appendTo = "";

  @Input() width = "auto";

  @Input() openOnInit = false;

  @Input() Items!: any;

  @Input() autoSelectFirstItem = false;

  @Input() IsCustomRequest = false;

  @Input() Params = "?id=0";
  @Input() Placeholder = "Select";
  @Input() Icon = "";

  val: any;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Output() OnInitEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnBlurEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnClearEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.OnInitEmitter.emit();

    if (this.Items == null && this.ApiMethod != "") {
      if (!this.IsCustomRequest) {
        this.loadItems();
      } else {
        this.loadItemsCustomQuery();
      }
    }
  }

  ngAfterViewInit() {
    if (this.openOnInit) {
      this.ngSelect.open();
    }
  }

  private async loadItems() {
    if (this.Items == null) {
      const response = await this.get_async_call_no_params(
        "Lookup/" + this.ApiMethod,
      );

      if (!response.isError) {
        this.Items = response.data.items;
        if (this.autoSelectFirstItem) {
          this.writeValue(this.Items![0].id);
        }
      }
    }
  }

  private async loadItemsCustomQuery() {
    if (this.Items == null) {
      const response = await this.get_async_call_no_params(
        "Lookup/" + this.ApiMethod + this.Params,
      );

      if (!response.isError) {
        this.Items = response.data.items;
        if (this.autoSelectFirstItem) {
          this.writeValue(this.Items![0].id);
          this.OnChangeEmitter.emit(this.Items![0]);
        }
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

  onClear() {
    this.value = null;
    this.OnClearEmitter.emit();
  }

  customSearchFn(term: string, item: any) {
    if (term != null) {
      term = term.toLowerCase();
      let found = false;

      if (item.GroupBy != null) {
        found = item.GroupBy.toLowerCase().indexOf(term) > -1;
      }

      if (!found) {
        if (item.Name != null) {
          found = item.Name.toLowerCase().indexOf(term) > -1;
        }
      }
      return found;
    }
    return false;
  }
}
