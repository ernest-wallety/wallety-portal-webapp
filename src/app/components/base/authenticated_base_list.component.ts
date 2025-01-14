import { Directive, Injectable } from "@angular/core";
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
         // lookup_helper
         // paging_service
      );
   }
}
