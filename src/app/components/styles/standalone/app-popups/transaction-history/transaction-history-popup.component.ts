import { CommonModule } from "@angular/common";
import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgbModalOptions, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";

@Component({
  selector: "app-transaction-history-popup",
  templateUrl: "./transaction-history-popup.component.html",
  styleUrls: ["./transaction-history-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class TransactionHistoryPopupComponent extends AuthenticatedBaseComponent {
  TransactionReference?: string;

  @ViewChild("transactionsTemplate")
  TransactionsTemplate!: TemplateRef<any>;

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
    };

    this.modalDialog = this.ngbModalService.open(
      this.TransactionsTemplate,
      option,
    );
  }

  public cancelClick() {
    this.modalDialog.close();
  }
}
