import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CourierSettings, CourierSettingsApi, NotificationApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-general-settings-form',
  templateUrl: './general-settings-form.component.html',
  styleUrls: ['./general-settings-form.component.scss'],
})
export class GeneralSettingsFormComponent implements OnInit {
  settingsForm: FormGroup;
  settingId;
  color;
  invoiceNotificationId
  appNotificationId;
  constructor(
    private courierSettingsApi: CourierSettingsApi,
    private fb: FormBuilder,
    private toast: NbToastrService,
    private notificationApi: NotificationApi,
    private courierService: CourierService,
  ) { }

  ngOnInit(): void {
    this.courierSettingsApi.findOne(
      {
        where: {
          courierId: this.courierService.getId(),
        },
        include: ['notifications', 'themeSetting'],
      },
    ).subscribe((setting: CourierSettings) => {
      this.settingId = setting.id;
      if (setting.notifications.length > 0) {
        setting.notifications.sort((a,b) => b.id - a.id)
      }
      console.log(setting);
      this.settingsForm = this.fb.group({
        name: [this.courierService.getName(), []],
        prefix: [{value: setting.prefix, disabled: true}, [Validators.required]],
        gct: [setting.gct, []],
        exchangeRate: [setting.exchangeRate, [Validators.required]],
        businessExchangeRate: [setting.businessExchangeRate, [Validators.required]],
        processingFee1: [setting.processingFee1, [Validators.required]],
        processingFee2: [setting.processingFee2, [Validators.required]],
        wStreet1: [setting.warehouseAddress ? setting.warehouseAddress.street1 : '', [Validators.required]],
        wStreet2: [setting.warehouseAddress ? setting.warehouseAddress.street2 : '', []],
        wCity: [setting.warehouseAddress ? setting.warehouseAddress.city : '', [Validators.required]],
        wState: [setting.warehouseAddress ? setting.warehouseAddress.state : '', [Validators.required]],
        wZip: [setting.warehouseAddress ? setting.warehouseAddress.zip : '', []],
        wCountry: [setting.warehouseAddress ? setting.warehouseAddress.country : '', [Validators.required]],
        sStreet1: [setting.storeAddress ? setting.storeAddress.street1 : '', [Validators.required]],
        sStreet2: [setting.storeAddress ? setting.storeAddress.street2 : '', []],
        sCity: [setting.storeAddress ? setting.storeAddress.city : '', [Validators.required]],
        sState: [setting.storeAddress ? setting.storeAddress.state : '', [Validators.required]],
        sZip: [setting.storeAddress ? setting.storeAddress.zip : '', []],
        sCountry: [setting.storeAddress ? setting.storeAddress.country : '', [Validators.required]],
        useJmd: [setting.useJmd, []],
        showNotificationOnInvoice: [setting.notifications.length > 0 ? setting.notifications[0].displayOnInvoice: false, [] ],
        invoiceNotificationTitle: [setting.notifications.length > 0 ? setting.notifications[0].title: '', [] ],
        invoiceNotificationMessage: [setting.notifications.length > 0 ? setting.notifications[0].message: '', [] ],
        showNotificationInApp: [setting.notifications.length > 0 ? setting.notifications[1].displayOnWebsite: false, [] ],
        appNotificationTitle: [setting.notifications.length > 0 ? setting.notifications[1].title: '', [] ],
        appNotificationMessage: [setting.notifications.length > 0 ? setting.notifications[1].message: '', [] ],
        mobilePhone: [setting.contactInformation ? setting.contactInformation.mobilePhone : '', []],
        workPhone: [setting.contactInformation ? setting.contactInformation.workPhone : '', []],
        homePhone: [setting.contactInformation ? setting.contactInformation.homePhone : '', []],
        secondaryEmail: [setting.contactInformation ? setting.contactInformation.secondaryEmail : '', []],
        ga: [setting.googleTrackingCode ? setting.googleTrackingCode : '', []],
        pwaSupported: [setting.pwaSupported, []],
        referralEnabled: [setting.referralEnabled, []],
        pointsEnabled: [setting.pointsEnabled, []],
        notificationEnabled: [setting.notificationEnabled, []],
        paymentsEnabled: [setting.paymentsEnabled, []]
      });

      this.invoiceNotificationId = setting.notifications[0].id;
      this.appNotificationId = setting.notifications[1].id;

    });
  }

  getOrCreateNotification() {
    this.notificationApi.findOne({
      where: {
        courierId: this.courierService.getId(),
      }
    })
  }

  updateSettings() {
    const settingsFormValues = this.settingsForm.getRawValue();

    this.courierSettingsApi.patchAttributes(this.settingId, {
      prefix: settingsFormValues.prefix,
      baseShippingRate: settingsFormValues.baseShippingRate,
      exchangeRate: settingsFormValues.exchangeRate,
      businessExchangeRate: settingsFormValues.businessExchangeRate,
      gct: settingsFormValues.gct,
      processingFee1: settingsFormValues.processingFee1,
      processingFee2: settingsFormValues.processingFee2,
      warehouseAddress: {
      street1:   settingsFormValues.wStreet1,
      street2: settingsFormValues.wStreet2,
      city: settingsFormValues.wCity,
      state: settingsFormValues.wState,
      zip: settingsFormValues.wZip,
      country: settingsFormValues.wCountry,
      },
      storeAddress: {
        street1:   settingsFormValues.sStreet1,
        street2: settingsFormValues.sStreet2,
        city: settingsFormValues.sCity,
        state: settingsFormValues.sState,
        zip: settingsFormValues.sZip,
        country: settingsFormValues.sCountry,
      },
      useJmd: settingsFormValues.useJmd,
      primaryColor: settingsFormValues.primaryColor,
      primaryTextColor: settingsFormValues.primaryTextColor,
      secondaryColor: settingsFormValues.secondaryColor,
      secondaryTextColor: settingsFormValues.secondaryTextColor,
      contactInformation: {
        mobilePhone: settingsFormValues.mobilePhone,
        homePhone: settingsFormValues.homePhone,
        workPhone: settingsFormValues.workPhone,
        secondaryEmail: settingsFormValues.secondaryEmail,
      },
      showNotificationOnInvoice: settingsFormValues.showNotificationOnInvoice,
    }).subscribe((updatedStatus: CourierSettings) => {
      // console.log(updatedStatus);
      this.toast.success('Store settings updated', 'Success!');

      this.courierSettingsApi.updateByIdNotifications(updatedStatus.id, this.invoiceNotificationId, {
        displayOnInvoice: this.settingsForm.controls.showNotificationOnInvoice.value,
        title: this.settingsForm.controls.invoiceNotificationTitle.value,
        message: this.settingsForm.controls.invoiceNotificationMessage.value
      }).subscribe(_ => {
        this.toast.success('Invoice Notification Updated', 'Success')
      }, error => {
        console.log(error);
      })

      this.courierSettingsApi.updateByIdNotifications(updatedStatus.id, this.appNotificationId, {
        displayOnWebsite: this.settingsForm.controls.showNotificationInApp.value,
        title: this.settingsForm.controls.appNotificationTitle.value,
        message: this.settingsForm.controls.appNotificationMessage.value
      }).subscribe(_ => {
        this.toast.success('App Notification Updated', 'Success')
      })

    }, err => {
      this.toast.danger('Failed to updated store settings' + err.message, 'Failed!');
    });
  }

  checkForUpdate() {
    this.toast.primary('Checking for updates', 'System Check');
    this.courierService.checkForUpdate();
  }


}
