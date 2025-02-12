import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { beforeEach, describe } from 'node:test';
import { AuthComponent } from './auth.component';

describe('AboutComponent', () => {
   let component: AuthComponent;
   let fixture: ComponentFixture<AuthComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [AuthComponent],
         providers: [
            {
               provide: ActivatedRoute,
               useValue: {}
            }
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(AuthComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });
});
