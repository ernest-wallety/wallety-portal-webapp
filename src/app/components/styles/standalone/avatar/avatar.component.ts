import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-avatar',
   standalone: true,
   imports: [NgbTooltipModule, CommonModule],
   template: `
     <div class="avatar-container avatar-{{Size}}" [style.background-color]="Colour" [ngbTooltip]="FullName || (ShortCode === '??' ? UnknownTitle : UnknownTitle)" container="body" placement="left">
         <ng-container *ngIf="Image; else noImage">
            <img [src]="Image" [alt]="FullName" class="avatar-img">
         </ng-container>
         <ng-template #noImage>
            {{ ShortCode || '??' }}
         </ng-template>
      </div>
   `,
   styles: [
      `
         .avatar-container {
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            overflow: hidden; /* Ensures the image does not spill outside */
            width: var(--avatar-size);
            height: var(--avatar-size);
         }

         .avatar-sm {
            --avatar-size: 20px;
         }

         .avatar-md {
            --avatar-size: 50px;
         }

         .avatar-lg {
            --avatar-size: 75px;
         }

         .avatar-xl {
            --avatar-size: 90px;
         }

         .avatar-img {
            width: 100%; /* Makes the image take the full width of the container */
            height: 100%; /* Makes the image take the full height of the container */
            object-fit: cover; /* Ensures the image fills the container while maintaining aspect ratio */
            border-radius: 50%; /* Makes it circular */
         }

      `
   ]
})
export class AvatarComponent implements OnInit {
   @Input() ShortCode = '??';
   @Input() FullName = '';
   @Input() Size = 'md';
   @Input() UnknownTitle = 'Unassigned';
   @Input() Colour = 'red';
   @Input() AutoColour = false;
   @Input() Image: string | null = null;

   ngOnInit() {
      if (this.FullName) {
         if (this.AutoColour == true) {
            this.Colour = this.stringToHslColor(this.FullName, 30, 65);
         }
         if (!this.ShortCode || this.ShortCode == '??') {
            this.ShortCode = this.getInitials(this.FullName);
         }
      }
   }

   stringToHslColor(str: string, s: number, l: number) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
         hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
   }

   getInitials(name: string) {
      const parts = name.split(' ').filter(i => i);
      let initials = '';
      for (let i = 0; i < parts.length && i < 2; i++) {
         if (parts[i].length > 0 && parts[i] !== '') {
            initials += parts[i][0];
         }
      }
      return initials;
   }
}
