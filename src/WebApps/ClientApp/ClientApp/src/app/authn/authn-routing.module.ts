import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationPaths } from './authn-constant';
import { LogoutComponent } from './logout/logout.component';
import { LoginfailComponent } from './loginfail/loginfail.component';

export const routes: Routes = [
  { path: AuthenticationPaths.loginCallback, component: LoginComponent },
  { path: AuthenticationPaths.logOutCallback, component: LogoutComponent },
  { path: AuthenticationPaths.loginfailCallback, component: LoginfailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: []
})
export class AuthenticationRoutingModule { }
