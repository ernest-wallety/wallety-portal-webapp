import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Injectable,
  PLATFORM_ID,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "./base.component";
// import { PagingService } from "../services/paging_service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { ExtensionMethods } from "../helpers/extension_methods";
import { MenuHelper } from "../helpers/menu_helper";
import { MenuListModel } from "../models/menu_model";
import { DataService } from "../services/apiconnector/data.service";
import { TitleService } from "../services/title.service";
import { Utils } from "../utils";
// import { LookupHelper } from '../helpers/lookup_helper';
import { AuthenticationHelper } from "../helpers/authentication_helper";

@Injectable()
@Directive()
// Component used for authenticated pages. There is a list version of this as well for list pages which inherits from this.
export class AuthenticatedBaseComponent extends BaseComponent {
  public PageTitle = "";

  // User related
  public ImageUrl?: string;
  public Email = this.LoggedInUser.User.Email;
  public FullName = `${this.LoggedInUser.User.Name || this.LoggedInUser.User.FirstName} ${this.LoggedInUser.User.Surname}`;
  public Role = this.LoggedInUser.RoleCodes?.find(
    (role) => role.IsDefault === true,
  );
  public UserRoles = Utils.lookup_converter(
    this.LoggedInUser.RoleCodes!,
    "Code",
    "Role",
  );

  // Inject providers imported in app.module
  constructor(
    public override data_service: DataService,
    public override router: Router,
    public override route: ActivatedRoute,
    public override toastr: ToastrService,
    public override ngbModalService: NgbModal,
    public override cd: ChangeDetectorRef,
    public override titleService: TitleService,
    @Inject(PLATFORM_ID) public override platformId: object,
    // public override lookup_helper: LookupHelper,

    // public paging_service: PagingService
  ) {
    //Call inherited constructor
    super(
      data_service,
      router,
      route,
      toastr,
      ngbModalService,
      cd,
      titleService,
      platformId,
      // lookup_helper
    );

    const image = this.LoggedInUser.User?.ProfileImage;

    this.ImageUrl =
      image === ""
        ? undefined
        : ExtensionMethods.to_base_64_image(
            this.LoggedInUser.User?.ProfileImage || "",
          );

    if (!this.has_menu_access) {
      this.router.navigateByUrl("/system/access-denied");
    }
  }

  public store_menu = async (): Promise<void> => {
    const response = await this.get_async_call_no_params(
      "/Portal/MenuStructure",
    );

    if (!response.IsError) {
      const menu_result: MenuListModel = response.Data;
      MenuHelper.set_menu_localstorage(menu_result, this.platformId);
    }

    this.cd.detectChanges();
  };

  get is_logged_in(): boolean {
    return AuthenticationHelper.is_logged_in(this.platformId);
  }

  get is_admin(): boolean {
    return AuthenticationHelper.is_admin(this.platformId);
  }

  get is_service_agent(): boolean {
    return AuthenticationHelper.is_service_agent(this.platformId);
  }

  get is_customer(): boolean {
    return AuthenticationHelper.is_customer(this.platformId);
  }

  get has_menu_access(): boolean {
    // Checks if the user has access to a certain path by checking if the 'path' argument matches any of the RouterLink values in MenuAccess
    const items = MenuHelper.get_menu_detail(this.platformId);
    const path = this.router.url;

    const hasAccess =
      Array.isArray(items) &&
      items.some((x: any) => {
        const module = path.includes(x.ModuleRoute);

        const moduleItems =
          x.ModuleItems !== null
            ? x.ModuleItems.some((y: any) => path.includes(y.ModuleItemRoute))
            : false;

        return module || moduleItems;
      });

    return hasAccess;
  }
}
