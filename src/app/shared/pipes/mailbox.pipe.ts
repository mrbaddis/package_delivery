import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'environments/environment';
import { CourierService } from '../services/courier.service';

@Pipe({
  name: 'mailbox',
})
export class MailboxPipe implements PipeTransform {

  constructor(private courierService: CourierService){}

  transform(value: string, ...args): unknown {

    return `${this.courierService.padMailboxNumber(value)}`;
  }

}
