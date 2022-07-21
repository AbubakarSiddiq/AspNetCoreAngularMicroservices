// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private route: ActivatedRoute,
    private _cookieService: CookieService,
    private _toastService: ToastrService,
    private router: Router) {}

  async canActivate() {
    debugger
    if(!this.isLoggedIn())
    {
        debugger
       this.router.navigate(['/login']);
       return false;
    }
    debugger

   // if (route.data.roles 
//       && (route.data.roles === null 
//         || !route.data.roles.includes(
//           // this._cookieService.get("authPermission")
//           await this._authService.getUserPermissionName(this._cookieService.get("userEmail")).toPromise()
//           ))) {
//       // role not authorised so redirect to home page
//       this._toastService.info("You Are Not Authorized To Access This Page", "Not Authorized")
//       return false; 
//   }


//   this.router.navigate(['/shop/checkout']);
    return true;
  }

  isLoggedIn() : boolean {
    // let loggedIn = localStorage.getItem('auth_token')  
    let loggedIn = this._cookieService.get("auth_token")
    if (loggedIn)
        return true
    else
        return false
  }

  permissionName() : string {
    debugger
    let permissionName = this._cookieService.get("authPermission")
    if (permissionName)
    {
      return permissionName
    }
    else
    {
      return null
    } 
  }

  getAllRoles() {
  } 

  getToken() : string {
    return this._cookieService.get("auth_token")
  }


}