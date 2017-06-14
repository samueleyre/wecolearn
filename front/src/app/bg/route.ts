import { Routes, RouterModule } from '@angular/router';
 
import { BlogComponent } 		from './components/blog/component';
import { ClientComponent } 		from './components/client/component';
import { AncreComponent } 		from './components/ancre/component';

import { AuthGuard } 			from './../applicativeService/authguard/service';
 
const appRoutes: Routes = [
    { path: 'blog', component: BlogComponent , canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent , canActivate: [AuthGuard] },
    { path: 'ancre', component: AncreComponent , canActivate: [AuthGuard] }
];

export const route = RouterModule.forChild(appRoutes);