import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutes } from './staff.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule, NzIconModule, NzInputModule, NzButtonModule, NzModalModule, NzFormModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from './search.pipe';

@NgModule({
   imports: [
      CommonModule,
      StaffRoutes,
      NzTableModule,
      NzInputModule,
      NzButtonModule,
      NzIconModule,
      NzModalModule,
      NzFormModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule
   ],
   declarations: [
      StaffComponent,
      SearchPipe
   ]
})
export class StaffModule { }
