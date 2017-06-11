import { Routes, RouterModule } from '@angular/router';
 
import { BlogComponent } 		from './components/blog/component';

import { AuthGuard } 			from './../applicativeService/authguard/service';
 
const appRoutes: Routes = [
    { path: 'blog', component: BlogComponent , canActivate: [AuthGuard] },
];

export const route = RouterModule.forChild(appRoutes);