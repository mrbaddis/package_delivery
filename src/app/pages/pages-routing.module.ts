import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      loadChildren: () => import('./dashboard/dashboard.module')
        .then(m => m.DashboardModule),
    },
    {
      path: 'customers',
      loadChildren: () => import('./customers/customers.module')
        .then(m => m.CustomersModule),
    },
    {
      path: 'packages',
      loadChildren: () => import('./packages/packages.module')
        .then(m => m.PackagesModule),
    },
    {
      path: 'invoices',
      loadChildren: () => import('./invoices/invoices.module')
        .then(m => m.InvoicesModule),
    },
    {
      path: 'notifications',
      loadChildren: () => import('./notifications/notifications.module')
        .then(m => m.NotificationsModule),
    },
    {
      path: 'reports',
      loadChildren: () => import('./reports/reports.module')
        .then(m => m.ReportsModule),
    },
    {
      path: 'users',
      loadChildren: () => import('./users/users.module')
        .then(m => m.UsersModule),
    },
    {
      path: 'logs',
      loadChildren: () => import('./log/log.module')
        .then(m => m.LogModule),
    },
    {
      path: 'settings',
      loadChildren: () => import('./settings/settings.module')
        .then(m => m.SettingsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'pos',
      loadChildren: () => import('./pos/pos.module')
        .then(m => m.PosModule),
    },
    {
      path: '',
      redirectTo: 'customers',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
