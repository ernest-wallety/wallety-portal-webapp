import { Directive, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { DataService } from "../apiconnector/data.service";
import { AuthenticatedBaseComponent } from "./authenticated_base.component";

@Injectable()
@Directive()
export class AuthenticatedBaseListComponent extends AuthenticatedBaseComponent {
   // Inject the providers imported from app.module
   constructor(
      public override data_service: DataService,
      public override router: Router,
      public override route: ActivatedRoute,
      public override toastr: ToastrService,
      public override ngbModalService: NgbModal,
      @Inject(PLATFORM_ID) public override platformId: object,
      // public override lookup_helper: LookupHelper,
      // public override paging_service: PagingService
   ) {
      // Call inherited class constructor
      super(
         data_service,
         router,
         route,
         toastr,
         ngbModalService,
         platformId
         // lookup_helper
         // paging_service
      );
   }
}
