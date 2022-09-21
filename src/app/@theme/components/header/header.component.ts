import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthService } from 'app/auth/auth.service';
import { Courier, CourierUser } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  private menuSubscription: Subscription;
  userPictureOnly: boolean = false;
  user$: Observable<CourierUser>;
  courier$: Observable<Courier>;
  currentTheme = 'light';

  userMenu = [
    // { title: 'Profile' },
    { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private authService: AuthService,
              private courierService: CourierService,
              ) {
  }

  ngOnInit() {
    // this.currentTheme = this.themeService.currentTheme;
    // this.changeTheme('dark');

    this.menuSubscription = this.menuService.onItemClick().subscribe(item => {
      if (item.item.title === 'Log out') {
        this.authService.logout(true);
      }
    });

    this.user$ = this.authService.currentUser;
    this.courier$ = this.courierService.courierApplication;

    if (!this.user$) {
      console.log("User not found, logging out");
      this.authService.logout(true);
    }

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.menuSubscription.unsubscribe();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
