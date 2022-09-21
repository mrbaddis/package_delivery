import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PackagesRoutingModule } from './packages-routing.module';
import { PackagesComponent } from './packages.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbAutocompleteModule, NbButtonModule, NbCardModule, NbContextMenuModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { CustomUserSearchComponent } from './custom-user-search/custom-user-search.component';
import { CustomerViewRenderComponent } from './customer-view-render/customer-view-render.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PackageItemComponent } from './package-item/package-item.component';
import { AddPackageFormComponent } from './add-package-form/add-package-form.component';

@NgModule({
  declarations: [PackagesComponent, CustomUserSearchComponent, CustomerViewRenderComponent, PackageItemComponent, AddPackageFormComponent],
  imports: [
    CommonModule,
    PackagesRoutingModule,
    Ng2SmartTableModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    ReactiveFormsModule,
    FormsModule,
    NbButtonModule,
    NbContextMenuModule,
    NbLayoutModule,
    NbAutocompleteModule,
    NbCardModule,
    NbToggleModule,
    NbSelectModule,
    MaterialFileInputModule,
    NbFormFieldModule,
    MatFormFieldModule,
  ],
})
export class PackagesModule { }
