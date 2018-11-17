import { NgModule }             from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';

import { ClientComponent } 				from './components/bo/clientsPage/client/component';
import { SettingsComponent } 				from './components/client/settings/component';
import { SearchComponent } 				from './components/client/searchPage/search/component';
import { ProfilSettingsComponent } 		from './components/client/profilPage/profilSettings/component';
import { MentionsComponent } 			from './components/client/mentionslegales/component';
import { AboutComponent } 			from './components/client/about/component';
import {AuthGuard} from './applicativeService/authguard/service';
import {HomeComponent}                  from   "./components/client/home/component";
import { SubscribeComponent }          from './components/client/subscribe/component';
import {CommunitiesComponent} from "./components/client/communities/component";
import {LoginComponent} from "./components/login/component";
import {ConfirmEmailComponent} from "./components/confirmEmail/component";
import {SendPasswordConfirmationEmailComponent} from "./components/resetPassword/sendConfirmationEmail/component";
import {ResetPasswordFormComponent} from "./components/resetPassword/resetPasswordForm/component";
import {UserComponent} from "./components/user/component";
import {NotFoundComponent} from "./components/notFound/component";


const wcRoutes: Routes = [
  { path : '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bo',      component: ClientComponent ,   canActivate: [AuthGuard] },
  { path: 'bo/user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'search',      component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'profilsettings', component: ProfilSettingsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'mentionslegales', component: MentionsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'communities', component: CommunitiesComponent},
  { path: 'subscribe', component: SubscribeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'password/email', component: SendPasswordConfirmationEmailComponent },
  { path: 'password/reset', component: ResetPasswordFormComponent },
  { path: 'confirmemail', component: ConfirmEmailComponent},
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '' , canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(wcRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class WcRoutingModule { }