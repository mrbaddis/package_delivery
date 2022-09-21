import { Component } from '@angular/core';
import { Courier } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Copyright <b><a *ngIf="courier$ | async as courier" href="#" target="_blank">{{courier.name}}</a></b> {{year}} <span class="pull-right"> {{version}}</span>
    </span>
  `,
})
export class FooterComponent {
  courier$: Observable<Courier>;
  year = new Date().getFullYear();
  version = environment.version;
  constructor(private courierService: CourierService) {
    this.courier$ = this.courierService.courierApplication;
    this.year = new Date().getFullYear();
  }
}
