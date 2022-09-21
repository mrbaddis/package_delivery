import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { MailOption, MailOptionApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-mail-settings-form',
  templateUrl: './mail-settings-form.component.html',
  styleUrls: ['./mail-settings-form.component.scss']
})
export class MailSettingsFormComponent implements OnInit {
  settingsForm: FormGroup;
  mailOptionId;
  methods = [
    {
      id: 1,
      name: 'SMTP'
    },
    {
      id: 2,
      name: 'SendGrid'
    }
  ];
  constructor(
    private fb: FormBuilder,
    private mailOptionApi: MailOptionApi,
    private toast: NbToastrService,
    private courierService: CourierService,
  ) { }

  ngOnInit(): void {
    this.mailOptionApi.findOne(
      {
        where: {
          courierId: this.courierService.getId(),
        },
      },
    ).subscribe((mailOption: MailOption) => {
      this.mailOptionId = mailOption.id;
      this.settingsForm = this.fb.group({
        host: [mailOption.host, [Validators.required, Validators.required]],
        port: [mailOption.port, [Validators.required]],
        secure: [mailOption.secure, [Validators.required]],
        user: [mailOption.user, [Validators.required]],
        password: [mailOption.password, [Validators.required]],
        rejectUnauthorized: [mailOption.rejectUnauthorized, [Validators.required]],
        sendGridApiKey: [mailOption.sendGridApiKey, []],
        method: [mailOption.method || 0, [Validators.required]]
      });
    });
  }

  testSmtpConnection() {
    const email = prompt('Enter the test recipients email');
    this.mailOptionApi.testConnection(this.courierService.getId(), email)
    .subscribe((sent: boolean) => {
      if (sent) {
        this.toast.success('Mail successfully sent', 'Sent');
      } else {
        this.toast.success('Mail test failed', 'Failed');
      }
    }, err => {
      this.toast.success('Mail test failed', 'Failed');
    });
  }

  testSendGridConnection() {
    const email = prompt('Enter the test recipients email');
    this.mailOptionApi.testSendGrid(this.courierService.getId(), email)
    .subscribe((sent: boolean) => {
      if (sent) {
        this.toast.success('Mail successfully sent with SendGrid', 'Sent');
      } else {
        this.toast.success('Mail test failed with SendGrid', 'Failed');
      }
    }, err => {
      this.toast.success('Mail test failed' + err.message, 'Failed');
    });
  }

  updateSettings() {
    const settingsFormValue = this.settingsForm.getRawValue();

    this.mailOptionApi.patchAttributes(this.mailOptionId, settingsFormValue)
    .subscribe(_ => this.toast.success('Mail option updated', 'Success'), err => {
      this.toast.danger('Failed to update mail option' + err.message, 'Failed');
    });
  }

}
