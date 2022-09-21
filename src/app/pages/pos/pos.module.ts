import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosRoutingModule } from './pos-routing.module';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbToggleModule, NbUserModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PosComponent } from './pos.component';



@NgModule({
  declarations: [PosComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbUserModule,
    NbAutocompleteModule,
    NbCardModule,
    NbToggleModule,
    NbSelectModule,
    MaterialFileInputModule,
    NbFormFieldModule,
    MatFormFieldModule,
    PosRoutingModule
  ]
})
export class PosModule { }
