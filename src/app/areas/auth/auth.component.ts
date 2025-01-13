import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
   selector: 'app-auth-layout',
   imports: [CommonModule, RouterOutlet],
   templateUrl: './auth.component.html',
   styleUrl: './auth.component.scss'
})

export class AuthComponent { }