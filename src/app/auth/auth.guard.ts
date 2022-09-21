import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { RoleMapping, RoleMappingApi, SDKToken } from 'app/shared/sdk';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private roleMappingApi: RoleMappingApi,
    private toast: NbToastrService,
    private router: Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.auth.getCurrentUserId() === null) { this.backToLogin(); return false; }

      
      if (this.isTokenExpired(this.authService.auth.getToken())) {
        this.backToLogin();
      }

      return this.roleMappingApi.findOne({
        where: {
          principalId: this.authService.auth.getCurrentUserId(),
        },
        include: ['role'],
      }).pipe(
        map((roleMap: RoleMapping) => {
          if (
            roleMap &&
            (
            roleMap.role.name.toLowerCase() === 'administrator' ||
            roleMap.role.name.toLowerCase() === 'cashier'
            )
            ) {
            localStorage.setItem('role', roleMap.role.name.toLowerCase());
            return true;
          } else {
            this.backToLogin();
          }
        }),
        shareReplay(1)
      );
  }

  backToLogin() {
    if (this.authService.isAuthenticated()) {
      this.toast.danger(
        'Please ensure you have enough rights to access this page.',
        'Access Denied',
        {
          duration: 4000,
        }
      );
      this.authService.logout(false);
    } else {
      this.router.navigate(['/']);
    }
  }

  isTokenExpired(token: SDKToken) {
    const now = new Date();
    let expiryDate = new Date(token.created);
    expiryDate.setSeconds(expiryDate.getSeconds() + token.ttl);
    return now > expiryDate;
  }

}
