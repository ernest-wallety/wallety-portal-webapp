import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { AuthenticationHelper } from "../../../helpers/authentication_helper";
import { MenuHelper } from "../../../helpers/menu_helper";
import { MenuAccessModel, MenuListModel } from "../../../models/menu_model";

@Component({
   selector: 'app-sidebar', // Changed to kebab-case with 'app' prefix
   standalone: true,
   imports: [CommonModule, RouterModule],
   templateUrl: './sidebar.component.html',
   styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent extends AuthenticatedBaseComponent implements OnInit {
   public MenuItems: any;
   public isExpanded = false;  // Track sidebar state

   expandedModuleActive = 'active';
   expandedModuleInactive = '';

   activeModule = '';

   @Output() public OnSidebarChange: EventEmitter<any> = new EventEmitter<any>();

   ngOnInit() {
      this.get_menu_items();
      this.set_active_menu_item();

      // Initialize expanded state
      const sidebar = document.getElementById('nav-bar');
      this.isExpanded = sidebar?.classList.contains('show') ?? false;
   }

   toggle_navbar(): void {
      const sidebar: any = document.getElementById('nav-bar');
      sidebar.classList.toggle('show');
      this.isExpanded = !this.isExpanded;
      this.OnSidebarChange.emit(this.isExpanded);
   }

   // Helper function to check if the current route matches the menu item's route
   public is_active_route(route: string): boolean {
      return this.router.url === route;
   }

   public async log_out() {
      const response = await this.post_sync_call('/Portal/Logout');

      if (!response.IsError) {
         AuthenticationHelper.clear_user_localstorage();

         this.router.navigate(['auth/login']);
      }
   }

   set_sidebar_children_class(selectedItem: MenuAccessModel) {
      this.MenuItems.forEach((menuItem: MenuAccessModel) => {
         if (menuItem === selectedItem) {
            // Toggle the selected item (expand/collapse)
            menuItem.ModuleSidebarClass =
               menuItem.ModuleSidebarClass === this.expandedModuleActive
                  ? this.expandedModuleInactive
                  : this.expandedModuleActive;
         } else {
            // Collapse other menu items
            menuItem.ModuleSidebarClass = this.expandedModuleInactive;
         }
      });

      // Set the active module for highlighting
      // this.activeModule = selectedItem.ModuleSidebarClass === this.expandedModuleActive ? selectedItem.ModuleSidebarClass : '';
   }

   private async get_menu_items() {
      const response = MenuHelper.get_menu_detail()

      this.MenuItems = response;

      this.MenuItems.forEach((menuItem: MenuAccessModel) => {
         menuItem.ModuleSidebarClass = 'expanded-module-item-inactive';
      });
   }

   // New function to find and set active menu item based on URL
   private set_active_menu_item() {
      const currentUrl = this.router.url; // Get the current route

      this.MenuItems.forEach((menuItem: MenuListModel) => {
         if (menuItem.ModuleRoute === currentUrl) {
            menuItem.ModuleSidebarClass = this.expandedModuleActive;
            this.activeModule = menuItem.ModuleSidebarClass;
         } else if (
            menuItem.ModuleItems &&
            menuItem.ModuleItems.some((subItem) => subItem.ModuleItemRoute === currentUrl)
         ) {
            menuItem.ModuleSidebarClass = this.expandedModuleActive;
            this.activeModule = menuItem.ModuleSidebarClass;
         } else {
            menuItem.ModuleSidebarClass = this.expandedModuleInactive;
         }
      });
   }

   // Utility to check if the current environment is a browser.
   private is_browser(): boolean {
      return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
   }

}