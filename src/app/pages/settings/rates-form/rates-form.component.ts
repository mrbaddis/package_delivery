import { Component, OnInit } from '@angular/core';
import { CourierSettings, CourierSettingsApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'ngx-rates-form',
  templateUrl: './rates-form.component.html',
  styleUrls: ['./rates-form.component.scss'],
})
export class RatesFormComponent implements OnInit {

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: true,
      position: 'right',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    columns: {
      weight: {
        title: 'Weight',
        type: 'string',
        editable: false,
        addable: false,
        filter: false,
      },
      price: {
        title: 'Price',
        type: 'number',
        filter: false,
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  settingId;
  exchangeRate: number;
  constructor(private courierSettingsApi: CourierSettingsApi, private courierService: CourierService) {

  }
  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.courierSettingsApi.findOne({
      where: {
        courierId: this.courierService.getId(),
      },
      fields: {
        id: true,
        weightPrice: true,
        exchangeRate: true,
      },
    })
    .pipe(
      tap((courierSetting: CourierSettings) => {
        this.settingId = courierSetting.id;
        this.exchangeRate = courierSetting.exchangeRate;
      }),
      map((data: CourierSettings) => {
        return data.weightPrice.map((weightPrice, index) => {
          return  {
            index,
            weight: `${index + 1} lb`,
            price:  (weightPrice).toFixed(2),
          };
        });
      }),
    )
    .subscribe(data => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event) {
    this.source.getAll().then(value => {
      const weightPrice = value.map(v => (v.price) );
      weightPrice[event.newData.index] = Number.parseFloat(event.newData.price);

      this.courierSettingsApi.patchAttributes(this.settingId, {
        weightPrice,
      }).subscribe(_ => {
        event.confirm.resolve();
      });
    });
  }

  resetToDefault() {
    const confirmation = prompt('What is the maximum lbs?', '100');

    if (confirmation) {
      const values = [];
      for (let i = 1; i <= Number.parseInt(confirmation); i++) {
        values.push(i);
      }

      this.courierSettingsApi.patchAttributes(this.settingId, {
        weightPrice: values,
      }).subscribe(_ => {
        this.getRates();
      })
    }
  }



}
