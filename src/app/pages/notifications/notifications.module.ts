import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbFormFieldModule, NbIconModule, NbInputModule, NbToggleModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';



@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    NotificationsRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    NbToggleModule,
    NbFormFieldModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbIconModule,
    MaterialFileInputModule,
  ]
})
export class NotificationsModule { }
