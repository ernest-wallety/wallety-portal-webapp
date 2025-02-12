import { Directive, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from './base.component';
// import { PagingService } from "../services/paging_service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../apiconnector/data.service';
// import { LookupHelper } from '../helpers/lookup_helper';

@Injectable()
@Directive()
// Component used for authenticated pages. There is a list version of this as well for list pages which inherits from this.
export class AuthenticatedBaseComponent extends BaseComponent {
  // Inject providers imported in app.module
  constructor(
    public override data_service: DataService,
    public override router: Router,
    public override route: ActivatedRoute,
    public override toastr: ToastrService,
    public override ngbModalService: NgbModal,
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
      platformId
      // lookup_helper
    );
  }
}

