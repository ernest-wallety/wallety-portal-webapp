import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

export class SystemComponent { }