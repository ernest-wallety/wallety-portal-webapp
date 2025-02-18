import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticatedBaseComponent } from '../../components/base/authenticated_base.component';
import { NavbarComponent } from '../../components/styles/standalone/navbar/navbar.component';
import { SidebarComponent } from '../../components/styles/standalone/sidebar/sidebar.component';

@Component({
   selector: 'app-sysem-layout',
   imports: [CommonModule, RouterOutlet, SidebarComponent, NavbarComponent],
   template: `
      <div class="layout-container">
         <app-sidebar></app-sidebar>
         
         <div class="main-wrapper">
            <app-navbar></app-navbar>

            <main class="main-content">
               <router-outlet></router-outlet>

               <!--EnableGlobalPager is set by the event EnableGlobalAction
               <nav class="navbar navbar-light bg-light mb-3" *ngIf="EnableGlobalPager">
                  <paging></paging>
               </nav>-->
            </main>
         </div>
      </div>
      
  `,
   styles: [`
   .layout-container {
      display: flex;
      height: 100vh;
      width: 100vw;
   }

   .main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
   }

   .main-content {
      flex: 1;
      overflow: hidden;
   }
`]
})

export class SystemComponent extends AuthenticatedBaseComponent { }