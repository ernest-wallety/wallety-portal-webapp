import { CommonModule } from "@angular/common";
import { HttpParams } from "@angular/common/http";
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
import { CustomCurrencyPipe } from "../../../../../components/utils/pipes/currency.pipe";
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";

@Component({
  selector: "app-transaction-history-popup",
  templateUrl: "./transaction-history-popup.component.html",
  styleUrls: ["./transaction-history-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CustomCurrencyPipe],
})
export class TransactionHistoryPopupComponent extends AuthenticatedBaseComponent {
  TransactionReference?: string;

  CustomerName?: string;
  CustomerDetails?: string;

  IsBeneficiary?: boolean;

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

  showDialog(item: any) {
    this.TransactionReference = item.transactionReference;
    this.CustomerName = `${item.firstName} ${item.surname}`;
    this.CustomerDetails = item.email ?? item.phoneNumber;
    this.IsBeneficiary = item.beneficiaryId != null ? true : false;

    const option: NgbModalOptions = {
      windowClass: "modal-standard-height",
      size: "xl",
      // fullscreen: "xxl",
      centered: true,
      animation: true,
    };

    this.modalDialog = this.ngbModalService.open(
      this.TransactionsTemplate,
      option,
    );

    this.ViewModel = Object.assign(new Object());

    if (item.transactionReference != "" || item.transactionReference != null)
      this.refresh(item.transactionReference);
  }

  public async refresh(reference: string) {
    const response = await this.get_async_call(
      "TransactionHistory/Get",
      new HttpParams().set("reference", reference),
    );

    if (!response.isError) {
      this.ViewModel = response.data;
    }
  }

  public cancelClick() {
    this.modalDialog.close();
  }
}
