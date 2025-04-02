import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Component, Input, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { AuthenticationHelper } from "../../../../helpers/authentication_helper";
import { Router } from "@angular/router";

@Component({
  selector: "app-token-exp-popup",
  templateUrl: "./token-expiration-popup.component.html",
  styleUrls: ["./token-expiration-popup.component.scss"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0 })),
      transition("void => *", animate("500ms")),
      transition("* => void", animate("500ms")),
    ]),
  ],
})
export class TokenExpPopupComponent implements OnInit {
  @Input() Title?: string;
  @Input() ListString?: string[];

  public timeRemaining = 10;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private ngbModalService: NgbModal,
    private router: Router,
  ) {}

  ngOnInit() {
    const countdown = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining -= 1;
      } else {
        clearInterval(countdown); // Stop the countdown when it reaches 0
        this.closeModal();
        this.redirect();
      }
    }, 1000); // Update every second
  }

  closeModal() {
    // The code to open the modal is located in the base component. I put this here because i can't access a close method in the base component - open to suggestions.
    this.ngbModalService.dismissAll();
  }

  redirect() {
    AuthenticationHelper.clear_user_localstorage(this.platformId);
    this.router.navigate(["auth/login"]);
  }
}
