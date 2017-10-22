import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } 		from './../../components/login/component';
import { UserComponent } 		from './../../components/user/component';
import { NotFoundComponent } 		from './../../components/notFound/component';


import { AuthGuard } 			from './../authguard/service';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'bo/user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '' , canActivate: [AuthGuard] }
];

export const routing = RouterModule.forChild(appRoutes);