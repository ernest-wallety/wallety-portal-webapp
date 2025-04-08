import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
})
export class ConfirmDialogComponent {
  @Input() title?: string;
  @Input() message?: string;

  public onNoClick: () => void = () => {};
  public onYesClick: () => void = () => {};

  constructor(public activeModal: NgbActiveModal) {}

  noClick() {
    if (this.onNoClick != null) {
      this.onNoClick();
    }
  }

  yesClick() {
    if (this.onYesClick != null) {
      this.onYesClick();
    }
  }
}

