import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrameComponent } from './frame.component';
import { FrameRoutes } from './frame.routing';
import { MenuModule } from '../_share-comp/menu/menu.module';
import { FooterModule } from '../_share-comp/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    MenuModule,
    FooterModule,
    FrameRoutes
  ],
  declarations: [FrameComponent]
})
export class FrameModule { }
