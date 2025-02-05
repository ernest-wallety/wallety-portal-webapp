import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-validation-popup',
   templateUrl: './validation-popup.component.html',
   styleUrls: ['./validation-popup.component.scss'],
   standalone: true,
   imports: [CommonModule]
})

export class ValidationPopupComponent {

   @Input()
   Title!: string;
   @Input()
   ListString!: string[];

   constructor(public ngbModalService: NgbModal) {

   }

   closeModal() {
      this.ngbModalService.dismissAll(); //The code to open the modal is located in the base component. I put this here because i can't access a close method in the base component - open to suggestions.
   }

}
