import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbButtonModule, NbCardModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [InvoicesComponent],
  imports: [
    CommonModule,
    InvoicesRoutingModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbFormFieldModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbButtonModule,
    NbToggleModule,
    NbContextMenuModule,
    FormsModule,
  ],
})
export class InvoicesModule { }
