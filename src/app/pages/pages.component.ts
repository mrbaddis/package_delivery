import { Component } from '@angular/core';

import { CASHIER_MENU_ITEMS, MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu;

  constructor() {
    console.log(localStorage.getItem('role'));
    if (localStorage.getItem('role') === 'administrator') {
      this.menu = MENU_ITEMS;
    } else if (localStorage.getItem('role') === 'cashier') {
      this.menu = CASHIER_MENU_ITEMS;
    }
  }
}
