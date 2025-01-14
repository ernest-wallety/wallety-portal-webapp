import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";

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

      if (window.innerWidth < 1500) this.toggle_navbar();
   }

   private async get_menu_items() {
      var response = await this.get_async_call_no_params('Menu/List');

      this.MenuItems = response;

      this.MenuItems.forEach((menuItem: any) => {
         menuItem.moduleSidebarClass = 'expanded-module-item-inactive';

         menuItem.menuList.forEach((item: any) => {
            if (this.router.url.indexOf(item.routerLink) !== -1) {
               menuItem.moduleSidebarClass = 'expanded-module-item-active';
            }
         });
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
      var sidebar: any = document.getElementById('nav-bar');
      sidebar.classList.toggle('show');
   }

   public async log_out() {
      var response = await this.post_sync_call('/Portal/Logout');

      if (!response.IsError) {
         AuthenticationHelper.clear_user_localstorage();
      }
   }
}