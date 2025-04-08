import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  HostListener,
  // Input,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";
import { SelectSingleLookupComponent } from "../../select-single-lookup/select-single-lookup.component";

@Component({
  selector: "app-credit-wallet-popup",
  templateUrl: "./credit-wallet-popup.component.html",
  styleUrls: ["./credit-wallet-popup.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SelectSingleLookupComponent,
  ],
})
export class CreditWalletPopupComponent extends AuthenticatedBaseComponent {
  @ViewChild("creditWalletTemplate")
  CreditWalletTemplate!: TemplateRef<any>;

  public modalDialog!: NgbModalRef;

  @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();
  @Output() OnCancel: EventEmitter<any> = new EventEmitter<any>();

  @HostListener("document:keydown.escape", ["$event"]) onKeydownHandler(
    event: KeyboardEvent,
  ) {
    console.log(event);

    if (this.modalDialog != null) {
      this.modalDialog.close();
    }
  }

  showDialog() {
    const option: NgbModalOptions = {
      windowClass: "modal-standard-height",
      size: "lg",
      centered: true,
      animation: true,
    };

    this.modalDialog = this.ngbModalService.open(
      this.CreditWalletTemplate,
      option,
    );
  }

  credit() {
    console.log("credit");
  }
}
