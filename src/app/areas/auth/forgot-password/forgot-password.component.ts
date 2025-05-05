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
    console.log("ready to go!!!");
  }

  public reset = async (form: NgForm) => {
    const email = form.value.email_address.trim();

    this.ViewModel = { Email: email };

    const response = await this.post_sync_call(
      "Auth/OneTimePassword",
      this.ViewModel,
    );

    if (!response.isError) {
      this.email_sent = true;

      this.router.navigate(["/auth/login"]);
    } else {
      this.email_sent = false;
    }

    this.cd.detectChanges();
  };
}
