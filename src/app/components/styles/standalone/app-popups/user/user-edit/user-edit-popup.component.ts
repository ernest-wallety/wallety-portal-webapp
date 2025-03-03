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
import { Subject, debounceTime, map } from "rxjs";
import { AuthenticatedBaseComponent } from "../../../../../base/authenticated_base.component";
import { Utils } from "../../../../../utils";
import { ConvertImagePipe } from "../../../../../utils/pipes/convert-image.pipe";
import { DisplayNamePipe } from "../../../../../utils/pipes/display-name.pipe";
import { EmailValidatorPipe } from "../../../../../utils/pipes/email-validator.pipe";
import { AvatarComponent } from "../../../avatar/avatar.component";

@Component({
  selector: "app-user-edit-popup",
  templateUrl: "./user-edit-popup.component.html",
  styleUrls: ["./user-edit-popup.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AvatarComponent,
    ConvertImagePipe,
    DisplayNamePipe,
    EmailValidatorPipe,
  ],
})
export class UserEditPopupComponent extends AuthenticatedBaseComponent {
  UserId?: string;

  emailValid = false;
  emailSubject = new Subject<string>();
  emailCheck$ = this.emailSubject.pipe(
    debounceTime(5000), // Wait for 5s after the last input before checking
    map((email) => this.validateEmail(email)),
  );

  @ViewChild("userEditTemplate") userEditTemplate!: TemplateRef<any>;

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

  showDialog(id: string) {
    this.UserId = id;

    const option: NgbModalOptions = {
      windowClass: "modal-standard-height",
      size: "lg",
    };

    this.modalDialog = this.ngbModalService.open(this.userEditTemplate, option);

    this.ViewModel = Object.assign(new Object());

    if (id !== "") this.refresh(id);

    this.emailCheck$.subscribe((isValid) => {
      this.emailValid = isValid;
    });
  }

  public async refresh(id: string): Promise<void> {
    const response = await this.get_async_call(
      "/Portal/GetUserById",
      new HttpParams().set("id", id),
    );

    if (!response.IsError) {
      this.ViewModel = response.Data;
    }
  }

  public async update() {
    this.ViewModel.Role = Utils.get_role_code(this.ViewModel.Roles);
    this.ViewModel.RoleCode = this.ViewModel.Role.RoleCode;
    this.ViewModel.Name = this.ViewModel.FirstName;

    const response = await this.post_sync_call(
      "/Auth/UserRoleChange",
      this.ViewModel,
    );

    if (!response.IsError) {
      this.OnSave.emit(response.Data);
      this.modalDialog.close();
    }
  }

  public async create() {
    this.ViewModel.Name = this.ViewModel.FirstName;
    this.ViewModel.WhatsappNumber = this.ViewModel.PhoneNumber;

    const response = await this.post_sync_call(
      "/CustomerServiceAgent/Register",
      this.ViewModel,
    );

    if (!response.IsError) {
      this.OnSave.emit(response.Data);
      this.modalDialog.close();
    }
  }

  onEmailChange(email: string) {
    this.emailSubject.next(email);
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
