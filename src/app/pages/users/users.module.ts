import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbTreeGridModule, NbIconModule, NbUserModule, NbListModule, NbInputModule, NbFormFieldModule, NbTabsetModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbUserModule,
    NbListModule,
    NbInputModule,
    ThemeModule,
    NbFormFieldModule,
    NbTabsetModule,
    NbButtonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule { }
