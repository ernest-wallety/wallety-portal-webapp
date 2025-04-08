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
import { CustomPhoneInputComponent } from "../../custom-phone-input/custom-phone-input.component";

@Component({
  selector: "app-credit-wallet-popup",
  templateUrl: "./credit-wallet-popup.component.html",
  styleUrls: ["./credit-wallet-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CustomPhoneInputComponent],
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
      size: "sm",
      centered: true,
      animation: true,
    };

    this.modalDialog = this.ngbModalService.open(
      this.CreditWalletTemplate,
      option,
    );

    this.ViewModel = Object.assign(new Object());
  }

  onChange($event: any) {
    if ($event !== null || $event !== undefined) {
      this.ViewModel.WhatsappNumber = $event;
    }
  }

  public async credit() {
  this.show_yes_no_dialog(
    'Confirm Wallety Credit',
    `Are you sure you want to proceed with this transaction? An amount of ${this.ViewModel.Amount} will be credited to ${this.ViewModel.WhatsappNumber}.`,
    async () => {
      this.ViewModel.RoleCode = this.Role?.Code;

      const response = await this.post_sync_call(
        "/Wallet/CreditWallet",
        this.ViewModel
      );

      if (!response.IsError) {
        this.OnSave.emit(response.Data);
        this.modalDialog.close();
      }
    },
    () => {
      // No callback (user canceled)
    }
  );
}

}
