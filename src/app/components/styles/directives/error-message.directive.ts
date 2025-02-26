import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[appErrorMessage]",
  standalone: true, // Makes the directive standalone
})
export class ErrorMessageDirective implements OnChanges {
  @Input() isError: boolean = false;
  @Input() errorMessage: string = "";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["isError"]) {
      if (this.isError) {
        this.el.nativeElement.innerHTML = this.errorMessage;
        this.renderer.addClass(this.el.nativeElement, "error-message");
      } else {
        this.el.nativeElement.innerHTML = "";
        this.renderer.removeClass(this.el.nativeElement, "error-message");
      }
    }
  }
}
