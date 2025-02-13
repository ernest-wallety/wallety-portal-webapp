import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";
import { MenuHelper } from "../../../helpers/menu_helper";

@Component({
   selector: 'app-sidebar', // Changed to kebab-case with 'app' prefix
   standalone: true,
   imports: [CommonModule, RouterModule],
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent extends AuthenticatedBaseComponent implements OnInit {
   public MenuItems: any;

   expandedModuleActive = 'active';
   expandedModuleInactive = '';

   @Output() public OnSidebarChange: EventEmitter<any> = new EventEmitter<any>();

   ngOnInit() {
      this.get_menu_items();

      if (!this.is_browser()) {
         console.warn('Attempted to set localStorage in a server environment.');
         return;
      }

      if (window.innerWidth > 1500) this.toggle_navbar();
   }

   private async get_menu_items() {
      const response = MenuHelper.get_menu_detail()

      console.log(response)

      this.MenuItems = response;

      this.MenuItems.forEach((menuItem: any) => {
         menuItem.moduleSidebarClass = 'expanded-module-item-inactive';

         // menuItem.forEach((item: any) => {
         //    if (this.router.url.indexOf(item.routerLink) !== -1) {
         //       menuItem.moduleSidebarClass = 'expanded-module-item-active';
         //    }
         // });
      });
   }

   set_sidebar_children_class(item: any) {
      item.hide = true;

      this.MenuItems.forEach((menuItem: any) => {
         menuItem.moduleSidebarClass = 'expanded-module-item-inactive';
      });

      if (item.moduleSidebarClass === this.expandedModuleActive) {
         item.moduleSidebarClass = this.expandedModuleInactive;
      } else if (item.moduleSidebarClass === this.expandedModuleInactive) {
         item.moduleSidebarClass = this.expandedModuleActive;
      }

      return false;
   }

   toggle_navbar() {
      const sidebar: any = document.getElementById('nav-bar');
      sidebar.classList.toggle('show');
   }

   // Utility to check if the current environment is a browser.
   private is_browser(): boolean {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
   }

   // Helper function to check if the current route matches the menu item's route
   is_active_route(route: string): boolean {
      return this.router.url === route;
   }

   public async log_out() {
      const response = await this.post_sync_call('/Portal/Logout');

      if (!response.IsError) {
         AuthenticationHelper.clear_user_localstorage();

         this.router.navigate(['auth/login']);
      }
   }
}