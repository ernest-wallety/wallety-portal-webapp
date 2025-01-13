import { animate, style, transition, trigger } from '@angular/animations';

export const pageTransitionAnimations = trigger('pageAnimations', [
   transition(':enter', [
      style({ opacity: 0, transform: 'translateY(10%)' }),
      animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0%)' }))
   ]),
   transition(':leave', [
      animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-10%)' }))
   ])
]);
