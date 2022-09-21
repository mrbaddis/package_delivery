import { Component, OnInit } from '@angular/core';
import { Log, LogApi, LogInterface } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {
  settings = {
    actions: {
      add: false,
      delete: false,
      edit: false,
    },
    columns: {
      id: {
        title: 'Id',
        width: '0px',
        type: 'number',
      },
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      isError: {
        title: 'Error',
        type: 'string',
        valuePrepareFunction: (value: boolean) =>
          value ? 'Yes':'No'
      },
      timestamp: {
        title: 'Timestamp',
        type: 'string',
        valuePrepareFunction: (value) =>
          new Date(value).toISOString()
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  showOnlyErrors = true;
  constructor(
    private courierService: CourierService,
    private logApi: LogApi
  ) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs() {
    this.logApi.find({
      where: {
        courierId: this.courierService.getId(),
        isError: this.showOnlyErrors
      },
      order: 'id DESC'
    })
    .subscribe((logs: LogInterface[]) => {
      this.source = new LocalDataSource(logs);
    })
  }

  onCheckChanged(value) {
    this.showOnlyErrors = !this.showOnlyErrors;
    this.loadLogs();
  }

}
