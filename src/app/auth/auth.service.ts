import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CourierUser, CourierUserApi, LoopBackAuth, SDKToken } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<CourierUser> = new BehaviorSubject(null);
  public currentUser: Observable<CourierUser>;

  constructor(
    private userApi: CourierUserApi,
    public auth: LoopBackAuth,
    private router: Router,
    private http: HttpClient,
    private courierService: CourierService,
    ) {

      if (localStorage.getItem('token')) {
        const token = JSON.parse(localStorage.getItem('token'))
        this.setCurrentUser(token);
        this.autoLogout(token)
      }

    }

  login(email: string, password: string): Observable<any> {
    const tenantId = this.courierService.getId();
    return this.userApi.login({email, password, realm: this.courierService.getRealm()});
  }

  logout(reload = true) {
    this.currentUserSubject.next(null);
    this.currentUser = null;
    this.userApi.logout().subscribe(
      (res) => {
        // console.log('Logged out');
        this.auth.clear();
        localStorage.clear();
        localStorage.removeItem('role');
        if (reload) {
          location.reload();
        }
      },
      (err) => {
        this.auth.clear();
        localStorage.clear();
        location.reload();
      }
    );
  }

  currentUserValue() {
    return this.currentUserSubject.value;
  }

  autoLogout(token: SDKToken): void {
    const now = new Date();
    const created = token.created;
    const ttl = token.ttl;
    const logoutDate = new Date();
    logoutDate.setSeconds(logoutDate.getSeconds() + ttl);

    if (now >= logoutDate) {
      console.log('Logout user');
      this.logout();
    }

  }



  setCurrentUser(token: SDKToken) {
    this.auth.setToken(token);
    this.autoLogout(token);
    this.currentUser = this.userApi.findById(this.auth.getCurrentUserId());
    this.currentUser.subscribe(user => {
      this.currentUserSubject.next(user);
      this.auth.setUser(user);
      this.auth.save();
      localStorage.setItem('token', JSON.stringify(token));
      // this.router.navigate(['/main']);
    });
  }

  isAuthenticated() {
    return this.auth.getCurrentUserId() !== null;
  }

  resetPassword(email: string) {
    return this.userApi.resetPassword({email, courierId: this.courierService.getId(), redirectUrl: 'https://admin.cmartshipping.com'});
  }

  changePassword(password: string, confirmPassword: string , accessToken: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const resetEndpoint = environment.apiUrl + '/' + environment.apiVersion + '/CourierUsers/reset-password?access_token=' + accessToken;
    return this.http.post(resetEndpoint, {
      newPassword: password,
      confirmation: confirmPassword,
    }, {
      headers,
    });

  }
}
