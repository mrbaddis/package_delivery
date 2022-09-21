import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourierApi, CourierInterface, CourierUser } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notificationForm: FormGroup;
  acceptedFileTypes = ['.html'];
  users: CourierInterface[] = [];
  constructor(
    private fb: FormBuilder,
    private usersApi: CourierApi,
    private courierService: CourierService,
  ) { }

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      subject: ['', [Validators.required]],
      isHtml: [false, [Validators.required]],
      message: ['', [Validators.required]],
      html: [null, []]
    });
    this.loadUsers();
  }

  loadUsers() {
    this.usersApi.find({
      where: {
        courierId: this.courierService.getId()
      },
      fields: {
        id: true,
        firstName: true,
        lastName: true
      }
    })
    .subscribe((users: CourierUser[]) => this.users = users);
  }

}
