import { Routes, RouterModule } from '@angular/router';
 
import { BlogComponent } 				from './components/blog/component';
import { ClientComponent } 				from './components/client/component';
import { AncreComponent } 				from './components/ancre/component';
import { ClefComponent } 				from './components/clef/component';
import { NeutreComponent }      		from './components/neutre/component';
import { NeutreGeneratorComponent } 	from './components/neutre-generator/component';
import { TitreComponent }            	from './components/titre/component';
import { BgUploadComponent }            from './components/upload/component';
import { MasseComponent }            	from './components/masse/component';
import { LaunchComponent }          	from './components/launch/component';
import { ProgrammationComponent }       from './components/programmation/component';
import { RechercheComponent }           from './components/recherche/component';



import { AuthGuard } 					from './../applicativeService/authguard/service';
 
const appRoutes: Routes = [
    { path: 'blog',     component: BlogComponent ,   canActivate: [AuthGuard] },
    { path: 'client',   component: ClientComponent , canActivate: [AuthGuard] },
    { path: 'ancre',    component: AncreComponent ,  canActivate: [AuthGuard] },
    { path: 'clef',     component: ClefComponent ,   canActivate: [AuthGuard] },
    { path: 'titre',    component: TitreComponent ,   canActivate: [AuthGuard] },
    { path: 'neutre',   component: NeutreComponent ,   canActivate: [AuthGuard] },
    { path: 'neutre-generator',   component: NeutreGeneratorComponent ,   canActivate: [AuthGuard] },
    { path: 'upload',   component: BgUploadComponent ,   canActivate: [AuthGuard] },
    { path: 'masse',    component: MasseComponent ,   canActivate: [AuthGuard] },
    { path: 'launch',   component: LaunchComponent ,   canActivate: [AuthGuard] },
    { path: 'programmation',   component: ProgrammationComponent ,   canActivate: [AuthGuard] },
    { path: 'recherche',   component: RechercheComponent ,   canActivate: [AuthGuard] },
];

export const route = RouterModule.forChild(appRoutes);