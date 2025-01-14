import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from '../../components/styles/animations/slide_in_animation';

@Component({
   selector: 'app-auth-layout',
   imports: [CommonModule, RouterOutlet],
   template: `
      <div [@routeAnimations]="getRouteAnimationData(outlet)">
         <router-outlet #outlet="outlet"></router-outlet>
      </div>
  `,

   changeDetection: ChangeDetectionStrategy.OnPush,
   animations: [slideInAnimation]
})

export class AuthComponent {
   constructor(private cdr: ChangeDetectorRef) { }

   getRouteAnimationData(outlet: RouterOutlet): string | null {
      const animation = outlet?.activatedRouteData?.['animation'] || null;

      this.cdr.markForCheck();

      return animation;
   }
}