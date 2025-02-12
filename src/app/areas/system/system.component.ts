import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../components/base/authenticated_base.component';
import { SidebarComponent } from '../../components/styles/standalone/sidebar/sidebar.component';

@Component({
   selector: 'app-sysem-layout',
   imports: [CommonModule, RouterOutlet, SidebarComponent],
   template: `
      <div class="wrapper d-flex align-items-stretch">
         <app-sidebar></app-sidebar>

         <div class="container-fluid p-0" style="overflow-x: hidden">
            <router-outlet></router-outlet>

            <!--EnableGlobalPager is set by the event EnableGlobalAction
            <nav class="navbar navbar-light bg-light mb-3" *ngIf="EnableGlobalPager">
               <paging></paging>
            </nav>-->
         </div>
      </div>
  `,
})

export class SystemComponent extends AuthenticatedBaseComponent implements OnInit {

   ngOnInit() {
      //Used to show and hide toast or popups after an http call is made. Subscribes to the data service which emits the response.    
      this.data_service.Response_Emitter.subscribe((response: any) => {
         this.handle_response(response);
      });
   };
}