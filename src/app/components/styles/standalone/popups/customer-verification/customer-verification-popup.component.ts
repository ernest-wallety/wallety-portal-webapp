import { CommonModule } from '@angular/common';
import {
   Component,
   EventEmitter,
   HostListener,
   Input,
   Output,
   TemplateRef,
   ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticatedBaseComponent } from '../../../../base/authenticated_base.component';
import { Utils } from '../../../../utils';
import { SelectSingleLookupComponent } from '../../select-single-lookup/select-single-lookup.component';

@Component({
   selector: 'app-customer-verification-popup',
   templateUrl: './customer-verification-popup.component.html',
   styleUrls: ['./customer-verification-popup.component.scss'],
   standalone: true,
   imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      SelectSingleLookupComponent
   ],
})
export class CustomerVerificationPopupComponent extends AuthenticatedBaseComponent {
   @Input() model?: any;
   @Input() reasons?: any;
   @Input() statuses?: any;

   public RegistrationStatus?: string;
   public RejectionReason?: string;

   private payload: {
      customerId: string;
      registrationStatusId: string;
      verificationRejectReasonId?: string | null;
   } = {
         customerId: '',
         registrationStatusId: '',
         verificationRejectReasonId: null,
      };

   public imageUrl?: string;
   public activeTab = 'customer-verification';

   @ViewChild('personalDetailsTemplate') PersonalDetailsTemplate!: TemplateRef<any>;

   public modalDialog!: NgbModalRef;

   @Output() OnSave: EventEmitter<BigInteger> = new EventEmitter<BigInteger>();
   @Output() OnCancel: EventEmitter<any> = new EventEmitter<any>();

   @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
      console.log(event)

      if (this.modalDialog != null) {
         this.modalDialog.close();
      }
   }

   showDialog() {
      const option: NgbModalOptions = { windowClass: 'modal-standard-height', size: 'lg' };
      this.modalDialog = this.ngbModalService.open(this.PersonalDetailsTemplate, option);

      this.statuses = Utils.lookup_converter(this.statuses, 'RegistrationStatusId', 'Status');
      this.reasons = Utils.lookup_converter(this.reasons, 'RejectReasonId', 'Reason');
      this.imageUrl = `data:image/jpeg;base64,${this.model?.IdentityImage}`;

      this.payload.customerId = this.model.CustomerId;
   }

   public async update() {
      const response = await this.post_sync_call('/Customer/VerifyAccount', this.payload);

      if (!response.IsError) {
         this.RegistrationStatus = undefined;
         this.RejectionReason = undefined;
         this.cancelClick();
         this.OnSave.emit();
      }
   }

   public cancelClick() {
      this.modalDialog.close();
   }

   // Method to switch tabs
   public switchTab(tab: string) {
      this.activeTab = tab;
   }

   public updateStatus(event: any, field: string) {
      console.log(event, field);

      if (event != null) {
         this.payload.registrationStatusId = event.Id;
      }
   }

   public updateReason(event: any, field: string) {
      console.log(event, field);

      if (event != null) {
         this.payload.verificationRejectReasonId = event.Id;
      }
   }

   async onChangeLookup(lookup: any, listFieldName: string) {
      console.log(lookup, listFieldName);
   }
}