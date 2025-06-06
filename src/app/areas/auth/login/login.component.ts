import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BaseComponent } from "../../../components/base/base.component";
import { AuthenticationHelper } from "../../../components/helpers/authentication_helper";
import { LoginResultModel } from "../../../components/models/login_result_model";
import { Utils } from "../../../components/utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginComponent extends BaseComponent implements OnInit {
  public show_password = false;
  public year: number = Utils.get_current_year();

  ngOnInit(): void {
    this.ViewModel = { Email: "", Password: "" };
  }

  public login = async (): Promise<void> => {
    const response = await this.post_sync_call("Auth/Login", this.ViewModel);

    if (!response.isError) {
      const login_result: LoginResultModel = response.data;

      AuthenticationHelper.set_user_localstorage(login_result, this.platformId);

      this.router.navigate(["/system/home"]);
    }

    this.cd.detectChanges();
  };

  togglePassword() {
    this.show_password = !this.show_password;
  }
}
