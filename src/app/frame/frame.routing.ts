import { Routes, RouterModule } from '@angular/router';
import { FrameComponent } from './frame.component';

const routes: Routes = [
  {
    path: '', component: FrameComponent, children: [
      { path: '', loadChildren: () => import('./home/home.module').then(x => x.HomeModule) },
      { path: 'staff', loadChildren: () => import('./staff/staff.module').then(x => x.StaffModule) }
    ]
  },
];

export const FrameRoutes = RouterModule.forChild(routes);
