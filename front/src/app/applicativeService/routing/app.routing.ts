import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } 		from './../../components/login/component';
import { HomeComponent } 		from './../../components/home/component';
import { UserComponent } 		from './../../components/user/component';


import { AuthGuard } 			from './../authguard/service';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    // { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' , canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(appRoutes);