import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";
import { ExtensionMethods } from "../../../helpers/extension_methods";
import { AvatarComponent } from "../avatar/avatar.component";


@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule, RouterModule, AvatarComponent],
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent extends AuthenticatedBaseComponent implements OnInit {
   PageTitle = '';
   ImageUrl = '';
   UnreadNotifications = 0; // Add counter for notifications

   public FullName = `${AuthenticationHelper.get_user_detail().User?.Name} ${AuthenticationHelper.get_user_detail().User?.Surname}`;
   public Colour = "#dfdfdf"
   public Role = AuthenticationHelper.get_user_detail().RoleCodes?.filter(role => role.IsDefault === true) || [];


   ngOnInit(): void {
      const identityImage = AuthenticationHelper.get_user_detail().User?.IdentityImage || '';

      this.ImageUrl = ExtensionMethods.to_base_64_image(identityImage);

      this.titleService.getTitleObservable().subscribe(title => {
         this.PageTitle = title;
      });

      // Simulate some notifications (replace with actual notification service)
      this.UnreadNotifications = 3;
   }

   openNotifications(): void {
      // Handle opening notifications
      console.log('Opening notifications');
   }
}