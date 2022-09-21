import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NbAlertModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    NbAlertModule,
    NbCardModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    AuthRoutingModule,
    NbAuthModule,
  ]
})
export class AuthModule { }
