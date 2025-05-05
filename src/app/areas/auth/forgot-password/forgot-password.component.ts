import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BaseComponent } from "../../../components/base/base.component";
import { Utils } from "../../../components/utils";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
  public email_sent = false;
  public year: number = Utils.get_current_year();

  ngOnInit(): void {
    this.ViewModel = { Email: "" };
  }

  public reset = async (form: NgForm) => {
    const email = form.value.email_address.trim();

    const response = await this.post_sync_call_non_object(
      "Auth/OneTimePassword",
      `"${email}"`,
    );

    if (!response.IsError) {
      this.email_sent = true;
      this.router.navigate(["/auth/login"]);
    } else {
      this.email_sent = false;
    }

    this.cd.detectChanges();
  };
}
