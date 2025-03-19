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
import { AuthenticatedBaseComponent } from "../../../../base/authenticated_base.component";
import { CustomCurrencyPipe } from "../../../../../components/utils/pipes/currency.pipe";

@Component({
  selector: "app-transaction-history-popup",
  templateUrl: "./transaction-history-popup.component.html",
  styleUrls: ["./transaction-history-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CustomCurrencyPipe],
})
export class TransactionHistoryPopupComponent extends AuthenticatedBaseComponent {
  TransactionReference?: string;
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
    this.TransactionReference = item.TransactionReference;
    this.IsBeneficiary = item.BeneficiaryId != null ? true : false;

    const option: NgbModalOptions = {
      windowClass: "modal-standard-height",
      size: "xl",
      centered: true,
      animation: true,
    };

    this.modalDialog = this.ngbModalService.open(
      this.TransactionsTemplate,
      option,
    );

    this.ViewModel = Object.assign(new Object());

    if (item.TransactionReference != "" || item.TransactionReference != null)
      this.refresh(item.TransactionReference);
  }

  public async refresh(reference: string) {
    const response = await this.get_async_call(
      "/TransactionHistory/GetByReference",
      new HttpParams().set("reference", reference),
    );

    console.log(response);

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  public cancelClick() {
    this.modalDialog.close();
  }
}
