import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-admin-layout',
   imports: [CommonModule, RouterOutlet],
   template: `<router-outlet></router-outlet>`,
})

export class AdminComponent { }