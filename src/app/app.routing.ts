import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./frame/frame.module').then(x => x.FrameModule) },
];

export const AppRoutes = RouterModule.forRoot(routes);
