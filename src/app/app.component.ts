/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { environment } from 'environments/environment';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { CourierApi, LoopBackConfig } from './shared/sdk';
import { CourierService } from './shared/services/courier.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private courierApi: CourierApi,
    private themeService: NbThemeService,
    private courierService: CourierService,
    ) {
      // this.themeService.changeTheme('dark');

  }

  ngOnInit(): void {
    LoopBackConfig.setBaseURL(environment.apiUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
    LoopBackConfig.filterOnUrl();
    // this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
    // this.courierApi.findById(this.courierService.getId())
    // .subscribe(_ => {
    // }, err => {
    //   alert('Uh oh, the service is currently down. Please try again later');
    //   // this.toast.danger('Failed to connect to server. Please try again or contact adminstrator', 'Failed');
    // });

  }
}
