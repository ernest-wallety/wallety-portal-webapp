import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-auth-layout',
   imports: [CommonModule, RouterLink, RouterOutlet],
   templateUrl: './auth.component.html',
   styleUrl: './auth.component.scss'
})

export class AuthComponent { }