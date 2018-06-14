import { NgModule }             from '@angular/core';
import { RouterModule, Routes }         from '@angular/router';
 
import { ClientComponent } 				from './components/bo/clientsPage/client/component';
import { ProfilComponent } 				from './components/client/profilPage/profil/component';
import { SearchComponent } 				from './components/client/searchPage/search/component';
import { ProfilSettingsComponent } 		from './components/client/profilPage/settings/component';
import { MentionsComponent } 			from './components/client/mentionslegales/component';



import {AuthGuard, AuthGuardSearch} from './../applicativeService/authguard/service';
import {HomeComponent}                  from   "./components/client/home/component";
import { SubscribeComponent }          from './components/client/subscribe/component';


const prRoutes: Routes = [
    { path: 'bo',      component: ClientComponent ,   canActivate: [AuthGuard] },
    // { path: 'profil',
    //     children: [
    //         {
    //             path: ':url',
    //             component: ProfilComponent,
    //             canActivate: [AuthGuard]
    //         }
    //     ]
    // },
    { path: 'search',      component: SearchComponent, canActivate: [AuthGuardSearch] },
    { path: 'settings', component: ProfilSettingsComponent, canActivate: [AuthGuard] },
    { path : 'mentionslegales', component: MentionsComponent},
    { path : 'subscribe', component: SubscribeComponent},
    { path : '', component: HomeComponent}


];

@NgModule({
  imports: [
    RouterModule.forChild(prRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PrRoutingModule { }