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
  @Input() BindLabel: string = "Name";
  @Input() BindValue: string = "Id";
  @Input() ApiMethod: string = "";
  @Input() Name: string = "";

  @Input() clearable: boolean = true;

  @Input() disabled: boolean = false;
  @Input() groupBy: string = "";
  @Input() filterId: string | null = null;
  @Input() appendTo: string = "";

  @Input() width: string = "auto";

  @Input() openOnInit: boolean = false;

  @Input() Items!: any;

  @Input() autoSelectFirstItem = false;

  @Input() IsCustomRequest: boolean = false;

  @Input() Params: string = "?id=0";

  val: any;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Output() OnInitEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnChangeEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed
  @Output() OnBlurEmitter: EventEmitter<any> = new EventEmitter<any>(); // Renamed

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

  async loadItems() {
    // if (this.Items == null) {
    //    var response = await this.get_sync_call_no_param('Lookup/' + this.ApiMethod);
    //    this.Items = response.data.data; // MP: weird stuff here
    //    if (this.autoSelectFirstItem) {
    //       this.writeValue(this.Items![0].id);
    //    }
    // }
  }

  async loadItemsCustomQuery() {
    if (this.Items == null) {
      // var response = await this.get_sync_call_param('Lookup/' + this.ApiMethod + this.Params);
      // this.Items = response.data.data; // MP: weird stuff here
      // console.log(response, 'response items');
      // console.log(this.Items, 'lookup items');
      // if (this.autoSelectFirstItem) {
      //    this.writeValue(this.Items![0].id);
      // }
    }
  }

  onChange: any = (_: any) => {};

  onTouched: any = () => {};

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
      let found: boolean = false;

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
