import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { PageNotFoundComponent} from './page-not-found.component';
import { OpenspaceListComponent } from './component/openspace-list/openspace-list.component';
import { EditOpenspaceComponent } from './component/openspace-edit/openspace-edit.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './auth-guard.service';
import { OpenspaceDetailComponent } from './component/openspace-detail/openspace-detail.component';
import { OpenspaceCreateComponent } from './component/openspace-create/openspace-create.component';


// routes
const appRoutes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent},
	{ path: 'openspace/list', component: OpenspaceListComponent, canActivate:[AuthGuard]},
	{ path: 'openspace/create', component: OpenspaceCreateComponent, canActivate:[AuthGuard]},
	{ path: 'openspace/edit/:id', component: EditOpenspaceComponent, canActivate:[AuthGuard]},
	{ path: 'openspace/:id', component: OpenspaceDetailComponent, canActivate:[AuthGuard]},
	{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'})
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }