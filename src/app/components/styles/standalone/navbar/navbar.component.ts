import { CommonModule } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AvatarComponent } from "../avatar/avatar.component";
import { UserProfilePopupComponent } from "../popups/user-profile/user-profile-popup.component";


@Component({
   selector: 'app-navbar',
   standalone: true,
   imports: [CommonModule, RouterModule, AvatarComponent, UserProfilePopupComponent],
   templateUrl: './navbar.component.html',
   styleUrls: ['./navbar.component.scss'],
})

export class NavbarComponent extends AuthenticatedBaseComponent implements OnInit {
   UnreadNotifications = 0; // Add counter for notifications

   @ViewChild('userProfilePopupComponent') userProfilePopupComponent!: UserProfilePopupComponent;

   ngOnInit(): void {
      this.titleService.getTitleObservable().subscribe(title => {
         this.PageTitle = title;
      });

      // Simulate some notifications (replace with actual notification service)
      this.UnreadNotifications = 3;
   }

   open_notifications(): void {
      // Handle opening notifications
      console.log('Opening notifications');
   }

   public async user_profile(): Promise<void> {
      this.userProfilePopupComponent.showDialog();
   }
}