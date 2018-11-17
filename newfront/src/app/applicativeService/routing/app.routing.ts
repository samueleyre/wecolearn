import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } 		from './../../components/login/component';
import { ConfirmEmailComponent} 		from './../../components/confirmEmail/component';
import { UserComponent } 		from './../../components/user/component';
import { NotFoundComponent } 		from './../../components/notFound/component';


import { AuthGuard } 			from './../authguard/service';
import {SendPasswordConfirmationEmailComponent} from "../../components/resetPassword/sendConfirmationEmail/component";
import {ResetPasswordFormComponent} from "../../components/resetPassword/resetPasswordForm/component";


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'confirmemail', component: ConfirmEmailComponent},
    { path: 'password/email', component: SendPasswordConfirmationEmailComponent },
    { path: 'password/reset', component: ResetPasswordFormComponent },
    { path: 'bo/user', component: UserComponent, canActivate: [AuthGuard] },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '' , canActivate: [AuthGuard] },

];

export const routing = RouterModule.forChild(appRoutes);