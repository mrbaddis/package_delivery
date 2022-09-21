import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CourierUser } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { ViewCell } from 'ng2-smart-table';

@Component({
  selector: 'ngx-customer-view-render',
  templateUrl: './customer-view-render.component.html',
  styleUrls: ['./customer-view-render.component.scss'],
})
export class CustomerViewRenderComponent implements OnInit, ViewCell {
  renderValue: string;
  @Input() value: string | number;
  @Input() rowData: any;
  constructor(
    private courierService: CourierService,
  ) { }

  ngOnInit(): void {
    const user: CourierUser = JSON.parse(this.value.toString());
    this.renderValue = `${this.pad(user.mailboxes[0].mailboxNumber)} - ${user.firstName} ${user.lastName}`;
  }

  pad(value, length = 5) {
    let str = '' + value;
    while (str.length < length) {
      str = '0' + str;
    }
    return `${str}`;
  }

}
