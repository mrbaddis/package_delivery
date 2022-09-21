import { Component, Input, OnInit } from '@angular/core';
import { CourierUser } from 'app/shared/sdk';

@Component({
  selector: 'ngx-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss'],
})
export class CustomerItemComponent implements OnInit {
  @Input() customer: CourierUser;
  constructor() { }

  ngOnInit(): void {
  }

}
