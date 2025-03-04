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
  selector: "app-register-service-agent-popup",
  templateUrl: "./register-service-agent-popup.component.html",
  styleUrls: ["./register-service-agent-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
})
export class RegisterServiceAgentPopupComponent extends AuthenticatedBaseComponent {
  @ViewChild("serviceAgentTemplate") serviceAgentTemplate!: TemplateRef<any>;

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
      this.serviceAgentTemplate,
      option,
    );
  }

  async register() {
    console.log(this.ViewModel);

    const response = await this.post_sync_call(
      "/CustomerServiceAgent/Register",
      this.ViewModel,
    );

    console.log(response);

    if (!response.IsError) {
      this.OnSave.emit(response.Data);
      this.modalDialog.close();
    }
  }
}
