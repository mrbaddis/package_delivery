import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { CourierApi, IconPack, IconPackApi, ThemeSettingApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-theme-settings-form',
  templateUrl: './theme-settings-form.component.html',
  styleUrls: ['./theme-settings-form.component.scss']
})
export class ThemeSettingsFormComponent implements OnInit, OnDestroy {
  settingsForm: FormGroup;
  courierSubscription: Subscription;
  themeSwatches: ColorSwatch[] = []
  iconPacks: IconPack[] = [];
  selectedIconPack: number;
  iconPackImages = [];
  constructor(
    private fb: FormBuilder,
    private courierService: CourierService,
    private iconPackApi: IconPackApi,
    private courierApi: CourierApi,
    private nbToastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.loadIconPacks();
    this.loadForm();
  }

  loadIconPacks() {
    this.iconPackApi.find({
      where: {
        or: [
          {
            courierId: this.courierService.getId()
          },
          {
            id: {
              inq: [1,2,3,4]
            }
          }
        ]
      },
      fields: {
        name: true,
        id: true,
      },
      order: 'name ASC'
    }).subscribe((iconPacks: IconPack[]) => {
      this.iconPacks = iconPacks;
    })
  }

  loadForm() {
    this.courierSubscription = this.courierService.courierApplication.subscribe(courier => {
      const themeSetting = courier.themeSetting;
      this.settingsForm = this.fb.group({
        backgroundColor: [themeSetting.backgroundColor, [Validators.required]],
        backgroundTextColor: [themeSetting.backgroundTextColor, [Validators.required]],
        primaryColor: [themeSetting.primaryColor, [Validators.required]],
        primaryTextColor: [themeSetting.primaryTextColor, [Validators.required]],
        secondaryColor: [themeSetting.secondaryColor, [Validators.required]],
        secondaryTextColor: [themeSetting.secondaryTextColor, [Validators.required]],
        warningColor: [themeSetting.warningColor, [Validators.required]],
        warningTextColor: [themeSetting.warningTextColor, [Validators.required]],
        errorColor: [themeSetting.errorColor, [Validators.required]],
        errorTextColor: [themeSetting.errorTextColor, [Validators.required]],
        iconPack: [themeSetting.iconPack, [Validators.required]],
        courierId: courier.id
      });
      this.settingsForm.valueChanges.subscribe(values => {console.log(values)})
      this.loadSwatches();
      this.setIconPackById(themeSetting.iconPack);
    })
  }

  loadSwatches() {
    this.themeSwatches = [
      {
        name: 'Background',
        backgroundControl: this.settingsForm.controls.backgroundColor,
        textControl: this.settingsForm.controls.backgroundTextColor
      },
      {
        name: 'Primary',
        backgroundControl: this.settingsForm.controls.primaryColor,
        textControl: this.settingsForm.controls.primaryTextColor
      },
      {
        name: 'Secondary',
        backgroundControl: this.settingsForm.controls.secondaryColor,
        textControl: this.settingsForm.controls.secondaryTextColor
      },
      {
        name: 'Warning',
        backgroundControl: this.settingsForm.controls.warningColor,
        textControl: this.settingsForm.controls.warningTextColor
      },
      {
        name: 'Error',
        backgroundControl: this.settingsForm.controls.errorColor,
        textControl: this.settingsForm.controls.errorTextColor
      }
    ]

  }

  setIconPackById(id) {
    this.iconPackApi.findById(id).subscribe((iconPack: IconPack) => {
      console.log("Icon pack set");
      this.selectedIconPack = iconPack.id;
      this.settingsForm.controls.iconPack.setValue(iconPack.id);
      this.iconPackImages = [
        iconPack.packageIcon,
        iconPack.profileIcon,
        iconPack.mailboxIcon,
        iconPack.warehouseIcon,
        iconPack.transitIcon,
        iconPack.invoiceIcon,
        iconPack.notificationIcon,
        iconPack.readyIcon,
        iconPack.reportIcon,
        iconPack.rewardsIcon,
        iconPack.moreIcon,
      ]
    })
  }


  updateSettings() {
    this.courierApi.updateThemeSetting(this.courierService.getId(), this.settingsForm.value).subscribe(
      updated => {
        console.log(updated);
        this.nbToastr.success('Theme settings updated.', 'Success')
    }, error => {
      this.nbToastr.danger('Failed to update theme settings');
    })
  }

  setControlValue(formControl: FormControl, color: string) {
    formControl.setValue(color);
  }

  ngOnDestroy() {
    this.courierSubscription.unsubscribe();
  }



}

export interface ColorSwatch {
  name: string;
  backgroundControl: AbstractControl;
  textControl: AbstractControl
}
