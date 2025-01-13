import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { pageTransitionAnimations } from './components/styles/page-animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [pageTransitionAnimations],
})

export class AppComponent {
  title = 'wallety-portal';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || null;
  }
}
