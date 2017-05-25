import { Routes, RouterModule } from '@angular/router';
 
import { LoginComponent } from './../components/Login/component';
import { HomeComponent } from './../components/home/component';
import { AuthGuard } from './../applicativeService/authguard/service';
 
const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);