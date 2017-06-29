import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } 		from './../../components/login/component';
import { HomeComponent } 		from './../../components/home/component';
import { UserComponent } 		from './../../components/user/component';

import { BlogComponent }		from './../../bg/components/blog/component';

import { AuthGuard } 			from './../authguard/service';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(appRoutes);