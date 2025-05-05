import { CommonModule } from "@angular/common";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthenticatedBaseComponent } from "../../../base/authenticated_base.component";
import { MenuHelper } from "../../../helpers/menu_helper";
import { MenuAccessModel, MenuListModel } from "../../../models/menu_model";

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent
  extends AuthenticatedBaseComponent
  implements OnInit
{
  public MenuItems: any;
  public isExpanded = false; // Track sidebar state

  expandedModuleActive = "active";
  expandedModuleInactive = "";

  activeModule = "";

  @Output() public OnSidebarChange: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    this.initialize_sidebar();
  }

  // Helper function to check if the current route matches the menu item's route
  public is_active_route(route: string): boolean {
    return this.router.url === route;
  }

  // public async log_out() {
  //   const response = await this.post_sync_call("/Portal/Logout");

  //   if (!response.IsError) {
  //     AuthenticationHelper.clear_user_localstorage(this.platformId);

  //     this.router.navigate(["auth/login"]);
  //   }
  // }

  public set_sidebar_children_class(selectedItem: MenuAccessModel) {
    this.MenuItems.forEach((menuItem: MenuAccessModel) => {
      if (menuItem === selectedItem) {
        // Toggle the selected item (expand/collapse)
        menuItem.moduleSidebarClass =
          menuItem.moduleSidebarClass === this.expandedModuleActive
            ? this.expandedModuleInactive
            : this.expandedModuleActive;
      } else {
        // Collapse other menu items
        menuItem.moduleSidebarClass = this.expandedModuleInactive;
      }
    });

    // Set the active module for highlighting
    // this.activeModule = selectedItem.ModuleSidebarClass === this.expandedModuleActive ? selectedItem.ModuleSidebarClass : '';
  }

  public toggle_navbar(): void {
    const sidebar: any = document.getElementById("nav-bar");

    sidebar.classList.toggle("show");

    this.isExpanded = !this.isExpanded;

    this.OnSidebarChange.emit(this.isExpanded);
  }

  private async initialize_sidebar() {
    if (!MenuHelper.is_menu_stored(this.platformId)) {
      await this.store_menu(); // Ensure menu is stored before proceeding
    }

    this.get_menu_items();
    this.set_active_menu_item();

    // Initialize expanded state
    const sidebar = document.getElementById("nav-bar");
    this.isExpanded = sidebar?.classList.contains("show") ?? false;
  }

  private async get_menu_items() {
    const response = MenuHelper.get_menu_detail(this.platformId);

    this.MenuItems = response;

    this.MenuItems.forEach((menuItem: MenuAccessModel) => {
      menuItem.moduleSidebarClass = "expanded-module-item-inactive";
    });
  }

  // New function to find and set active menu item based on URL
  private set_active_menu_item() {
    const currentUrl = this.router.url; // Get the current route

    this.MenuItems.forEach((menuItem: MenuListModel) => {
      if (menuItem.moduleRoute === currentUrl) {
        menuItem.moduleSidebarClass = this.expandedModuleActive;
        this.activeModule = menuItem.moduleSidebarClass;
      } else if (
        menuItem.moduleItems &&
        menuItem.moduleItems.some(
          (subItem) => subItem.moduleItemRoute === currentUrl,
        )
      ) {
        menuItem.moduleSidebarClass = this.expandedModuleActive;
        this.activeModule = menuItem.moduleSidebarClass;
      } else {
        menuItem.moduleSidebarClass = this.expandedModuleInactive;
      }
    });
  }
}
