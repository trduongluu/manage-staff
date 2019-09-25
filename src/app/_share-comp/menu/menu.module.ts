import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule } from '@angular/router';
import { NzMenuModule, NzIconModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NzMenuModule,
    NzIconModule
  ],
  exports: [
    MenuComponent
  ],
  declarations: [MenuComponent]
})
export class MenuModule { }
