import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
// tslint:disable-next-line: max-line-length
import { NbCardModule, NbTreeGridModule, NbIconModule, NbInputModule, NbUserModule, NbTabsetModule, NbButtonModule, NbListModule, NbFormFieldModule, NbContextMenuModule, NbToggleModule, NbSpinnerModule } from '@nebular/theme';
import { ThemeModule } from 'app/@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomersComponent } from './customers.component';
import { CustomerComponent } from './customer/customer.component';
import { MailboxPipe } from 'app/shared/pipes/mailbox.pipe';
import { CustomerPackageTableComponent } from './customer/customer-package-table/customer-package-table.component';
import { CustomerInvoiceTableComponent } from './customer/customer-invoice-table/customer-invoice-table.component';
import { CustomerProfileFormComponent } from './customer/customer-profile-form/customer-profile-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerComponent,
    MailboxPipe,
    CustomerPackageTableComponent,
    CustomerInvoiceTableComponent,
    CustomerProfileFormComponent,
    CustomerItemComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    CommonModule,
    FormsModule,
    NbButtonModule,
    NbContextMenuModule,
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    NbUserModule,
    NbListModule,
    NbInputModule,
    NbToggleModule,
    ThemeModule,
    NbSpinnerModule,
    NbFormFieldModule,
    NbTabsetModule,
    ScrollingModule,
    NbButtonModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ],
})
export class CustomersModule { }
