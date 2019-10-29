import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { LoginComponent } from './component/login/login.component';
import { OpenspaceFormComponent } from './component/openspace-form/openspace-form.component';
import { OpenspaceListComponent } from './component/openspace-list/openspace-list.component';
import { EditOpenspaceComponent } from './component/openspace-edit/openspace-edit.component';
import { OpenspaceDetailComponent } from './component/openspace-detail/openspace-detail.component'
import { NavBarComponent } from './component/navbar/nav-bar.component';
import { ProfileInformationComponent } from './component/profile-information/profile-information.component';
import { OpenspaceCreateComponent } from './component/openspace-create/openspace-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { PageNotFoundComponent }  from './page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './service/auth.service';
import { OpenspaceService } from './service/openspace.service';
import { UserService } from './service/user.service';

import { BorderOpenspaceDirective } from './component/openspace-list/border-openspace.directive';
import { ConfirmEqualValidatorDirective } from './component/login/confirm-equal-validator.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports:  [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule
 ],
  declarations: [
      AppComponent,
      LoginComponent,
      OpenspaceListComponent,
      NavBarComponent,
      ProfileInformationComponent,
      OpenspaceDetailComponent,
      EditOpenspaceComponent,
      OpenspaceFormComponent,
      BorderOpenspaceDirective,
      OpenspaceCreateComponent,
      ConfirmEqualValidatorDirective,
      PageNotFoundComponent],
  bootstrap:  [ AppComponent ],
  providers: [
      AuthGuard,
      AuthService,
      OpenspaceService,
      UserService,
    ]
})
export class AppModule { }