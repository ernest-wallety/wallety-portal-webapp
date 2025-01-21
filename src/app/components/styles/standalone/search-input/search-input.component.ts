import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
   selector: 'app-search-input',
   standalone: true,
   template: `
    <div class="search-container">
      <i class="bx bx-search search-icon"></i>
      <input
        class="form-control"
        type="search"
        [placeholder]="placeholder"
        [(ngModel)]="value"
        (input)="onSearchChange()"
      />
    </div>
  `,
   imports: [FormsModule],
}
)
export class SearchInputComponent {
   @Input() placeholder: string = 'Search...';

   @Input() value: string = '';

   @Output() valueChange = new EventEmitter<string>();

   onSearchChange() {
      this.valueChange.emit(this.value);
   }
}
