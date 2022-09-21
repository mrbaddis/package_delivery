import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogComponent } from './log.component';
import { LogRoutingModule } from './log.routing.module';
import { NbCardModule, NbToggleModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  declarations: [LogComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbToggleModule,
  ]
})
export class LogModule { }
