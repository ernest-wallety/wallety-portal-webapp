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
import { DataService } from "../services/apiconnector/data.service";
import { TitleService } from "../services/title.service";
import { Utils } from "../utils";
// import { LookupHelper } from '../helpers/lookup_helper';

@Injectable()
@Directive()
// Component used for authenticated pages. There is a list version of this as well for list pages which inherits from this.
export class AuthenticatedBaseComponent extends BaseComponent {
  public PageTitle = "";

  // User related
  public ImageUrl?: string;
  public FullName = `${this.LoggedInUser.User.Name} ${this.LoggedInUser.User.Surname}`;
  public Role = this.LoggedInUser.RoleCodes?.find(
    (role) => role.IsDefault === true,
  );
  public Colour = "#dfdfdf";
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

    const image = this.LoggedInUser.User?.IdentityImage;

    this.ImageUrl =
      image === ""
        ? undefined
        : ExtensionMethods.to_base_64_image(
            this.LoggedInUser.User?.IdentityImage || "",
          );
  }
}
