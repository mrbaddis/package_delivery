import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { NbButtonModule, NbCardModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralSettingsFormComponent } from './general-settings-form/general-settings-form.component';
import { RatesFormComponent } from './rates-form/rates-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MailSettingsFormComponent } from './mail-settings-form/mail-settings-form.component';
import { ContactInformationFormComponent } from './contact-information-form/contact-information-form.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ThemeSettingsFormComponent } from './theme-settings-form/theme-settings-form.component';
import { ColorSketchModule } from 'ngx-color/sketch';
@NgModule({
  declarations: [SettingsComponent, GeneralSettingsFormComponent, RatesFormComponent, MailSettingsFormComponent, ContactInformationFormComponent, ThemeSettingsFormComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NbCardModule,
    NbFormFieldModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    ColorPickerModule,
    NbButtonModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbToggleModule,
    ColorSketchModule,
    NbLayoutModule,
    FormsModule,
  ],
})
export class SettingsModule { }
