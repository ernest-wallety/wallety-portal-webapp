import { CommonModule } from "@angular/common";
import { Component, Inject, Input, PLATFORM_ID } from "@angular/core";
import { NgbActiveModal, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthenticationHelper } from "../../../../helpers/authentication_helper";

@Component({
  selector: "app-validation-popup",
  templateUrl: "./validation-popup.component.html",
  styleUrls: ["./validation-popup.component.scss"],
  standalone: true,
  imports: [CommonModule, NgbModalModule],
})
export class ValidationPopupComponent {
  @Input() Title!: string;
  @Input() ListString!: string[];

  @Input() Type!: string;
  @Input() Raw!: string;

  isExpanded = false;

  constructor(
    public activeModal: NgbActiveModal,
    @Inject(PLATFORM_ID) public platformId: object,
  ) {}

  closeModal() {
    this.activeModal.close();
  }

  toggleCollapse() {
    this.isExpanded = !this.isExpanded;
  }

  get isAdmin(): boolean {
    return AuthenticationHelper.is_admin(this.platformId);
  }
}
