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
import * as googleLibphonenumber from "google-libphonenumber";

@Component({
  selector: "app-custom-phone-input",
  templateUrl: "./custom-phone-input.component.html",
  styleUrls: ["./custom-phone-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomPhoneInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
})
export class CustomPhoneInputComponent
  extends BaseComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  SelectedCountry: any;
  PhoneNumberPlaceholder = "Enter number";

  @Input() PhoneNumber = "";

  @Input() BindLabel = "Name";
  @Input() BindValue = "Id";
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

  @Input() Placeholder = "Select";

  @Input() autoSelectFirstItem = false;

  val: any;

  @ViewChild(NgSelectComponent) ngSelect!: NgSelectComponent;

  @Output() OnInitEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnChangeEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnBlurEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() OnClearEmitter: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.OnInitEmitter.emit();

    if (this.Items == null && this.ApiMethod != "") {
      this.loadItems();
    }
  }

  ngAfterViewInit() {
    if (this.openOnInit) {
      this.ngSelect.open();
    }
  }

  private phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();
  private PNF = googleLibphonenumber.PhoneNumberFormat;

  private async loadItems() {
    if (this.Items == null) {
      const response = await this.get_async_call_no_params(
        "/Lookup/" + this.ApiMethod,
      );

      if (!response.IsError) {
        this.Items = response.Data.Items;
        if (this.autoSelectFirstItem) {
          this.writeValue(this.Items![0].Id);
        }
      }
    }
  }

  // Function to get flag URL using country code
  getFlagUrl(countryCode: string): string {
    // You can use a service like flagcdn.com or your own hosted flags
    return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;

    // Alternatively, if hosting locally:
    // return `assets/flags/${countryCode.toLowerCase()}.png`;
  }

  // Get placeholder example for the selected country
  getPhoneNumberPlaceholder(): string {
    if (!this.SelectedCountry) return "Enter number";

    // Get country code from Icon field (e.g., 'ZW' for Zimbabwe)
    const countryCode = this.SelectedCountry.Icon;

    // Generate an example number for the country
    const exampleNumber = this.phoneUtil.getExampleNumberForType(
      countryCode,
      googleLibphonenumber.PhoneNumberType.MOBILE,
    );

    if (exampleNumber)
      return this.phoneUtil.format(exampleNumber, this.PNF.NATIONAL);

    return "Enter number";
  }

  onPhoneNumberInput(event: any): void {
    if (!this.SelectedCountry) return;

    let inputValue = event.target.value.replace(/\D/g, ""); // digits only

    const maxLength = this.getMaxPhoneNumberLength();
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
      event.target.value = inputValue;
    }

    try {
      const parsedNumber = this.phoneUtil.parse(
        inputValue,
        this.SelectedCountry.Icon,
      );
      if (this.phoneUtil.isValidNumber(parsedNumber)) {
        const formatted = this.phoneUtil.format(
          parsedNumber,
          this.PNF.NATIONAL,
        );
        this.PhoneNumber = formatted;
        event.target.value = formatted;
      } else {
        this.PhoneNumber = inputValue; // still show unformatted if invalid
      }
    } catch {
      this.PhoneNumber = inputValue; // fallback in case of parse error
    }

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit(this.PhoneNumber);
    }
  }

  getMaxPhoneNumberLength(): number {
    if (!this.SelectedCountry) return 15; // default global max

    const exampleNumber = this.phoneUtil.getExampleNumberForType(
      this.SelectedCountry.Icon,
      googleLibphonenumber.PhoneNumberType.MOBILE,
    );

    if (exampleNumber) {
      const nationalNumber =
        this.phoneUtil.getNationalSignificantNumber(exampleNumber);

      return nationalNumber.length + 1;
    }

    return 15; // fallback
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
    this.SelectedCountry = $event;
    this.PhoneNumber = "";

    this.onChange(this.val);

    if (this.OnChangeEmitter != null) {
      this.OnChangeEmitter.emit(this.value);
    }

    // Update the placeholder when country changes
    this.PhoneNumberPlaceholder = this.getPhoneNumberPlaceholder();
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
