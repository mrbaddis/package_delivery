import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService, NbToastrService } from '@nebular/theme';
import { CourierPackage, CourierPackageApi, CourierUserApi, LoopBackAuth } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-customer-package-table',
  templateUrl: './customer-package-table.component.html',
  styleUrls: ['./customer-package-table.component.scss'],
})
export class CustomerPackageTableComponent implements OnInit, OnDestroy {
  showDelivered = false;
  settings = {
    selectMode: 'multi',
    add: {
      inputClass: 'text-black',
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      inputClass: 'text-black',
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      add: true,
      edit: true,
      delete: true,
      position: 'right',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'Id',
        width: '0px',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      trackingNo: {
        title: 'Track No.',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value) =>
          value.length > 10 ? value.substr(0, 10) + '...' : value,
      },
      description: {
        title: 'Desc.',
        type: 'string',
        filter: false,
      },
      value: {
        title: 'Value',
        type: 'number',
        filter: false,
      },
      customsFee: {
        title: 'Customs Fee',
        type: 'number',
        filter: false,
      },
      weight: {
        title: 'Weight',
        type: 'number',
        filter: false,
        width: '10px',
      },
      merchant: {
        title: 'Merchant',
        type: 'string',
        filter: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
              {
                value: 'Pre Alert',
                title: 'Pre Alert',
              },
              {
                value: 'At Warehouse',
                title: 'At Warehouse',
              },
              {
                value: 'In Transit',
                title: 'In Transit',
              },
              {
                value: 'Ready',
                title: 'Ready',
              },
              {
                value: 'Delivered',
                title: 'Delivered',
              },
            ],
          },
        },
      },
    },
  };
  packageDataSource: LocalDataSource = new LocalDataSource();
  @Output() packageUpdated = new EventEmitter();
  bulkActions = [
    { title: 'Mark as Pre-Alert', data: 'Pre Alert' },
    { title: 'Mark as At Warehouse', data: 'At Warehouse' },
    { title: 'Mark as In Transit', data: 'In Transit' },
    { title: 'Mark as Ready', data: 'Ready' },
    { title: 'Mark as Delivered', data: 'Delivered' },
  ];
  selected: CourierPackage[] = [];
  bulkButtonSub: Subscription;
  isAdmin = false;
  constructor(
    private route: ActivatedRoute,
    private packageApi: CourierPackageApi,
    private auth: LoopBackAuth,
    private toast: NbToastrService,
    private nbMenuService: NbMenuService,
    private courierService: CourierService,
  ) {
    this.isAdmin = localStorage.getItem('role') === 'administrator';
    if ( !this.isAdmin ) {
      this.settings.actions.delete = false;
      this.settings.actions.add = false;
      this.settings.actions.edit = false;
    }
  }

  ngOnInit(): void {
    this.selected = [];
    this.bulkButtonSub = this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'bulk-actions-menu'),
        map((menuItems) => {
          return {
            title: menuItems.item.title,
            data: menuItems.item.data,
          };
        })
      )
      .subscribe((menuItem) => this.bulkAction(menuItem));
    this.getPackages();
  }

  ngOnDestroy() {
    this.bulkButtonSub.unsubscribe();
  }

  getPackages(status = {neq: 'Delivered'}) {

    this.packageApi
      .find({
        where: {
          ownerId: this.route.snapshot.params.id,
          status,
        },
        order: 'id DESC',
      })
      .subscribe((cPackages: CourierPackage[]) => {
        this.packageDataSource = new LocalDataSource(cPackages);
      });
  }

  onPackageSearch(query: string = '') {
    if (query === '') {
      return;
    }

    this.packageDataSource.setFilter(
      [
        {
          field: 'trackingNo',
          search: query,
        },
        {
          field: 'id',
          search: query,
        },
      ],
      false,
    );
  }

  viewPackage(cPackage) {}

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this package?')) {
      this.packageApi.deleteById(event.data.id).subscribe(
        (deleted) => {
          this.toast.success('Package successfully deleted', 'Success!');
          event.confirm.resolve();
        },
        (err) => {
          event.confirm.reject();
        },
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (!event.newData.trackingNo) {
      this.toast.danger('Tracking No is required', 'Add Package Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.description) {
      this.toast.danger('Description is required', 'Add Package Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.weight) {
      this.toast.danger('Weight is required', 'Add Package Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.status) {
      this.toast.danger('Status is required', 'Add Package Failed');
      event.confirm.reject();
      return;
    }

    this.packageApi
      .create({
        trackingNo: event.newData.trackingNo,
        description: event.newData.description,
        status: event.newData.status,
        value: event.newData.value ?? 1,
        customsFee: event.newData.customsFee ?? 0,
        weight: event.newData.weight,
        ownerId: this.route.snapshot.params.id,
        courierId: this.courierService.getId(),
        createdBy: this.auth.getCurrentUserId() ?? -1,
      })
      .subscribe(
        (_) => {
          this.toast.success('Package successfully created', 'Success!');
          this.getPackages();
          this.packageUpdated.emit();
          event.confirm.resolve();
        },
        (err) => {
          this.toast.danger(
            'Failed to create package ' + err.message,
            'Failed!',
          );
          event.confirm.reject();
          return;
        },
      );
  }

  onEditConfirm(event) {
    this.packageApi
      .patchAttributes(event.newData.id, {
        trackingNo: event.newData.trackingNo,
        description: event.newData.description,
        weight: event.newData.weight,
        status: event.newData.status,
        value: event.newData.value,
        customsFee: event.newData.customsFee,
        merchant: event.newData.merchant,
      })
      .subscribe(
        (cPackage) => {
          this.toast.success('Package successfully updated', 'Success!');
          event.confirm.resolve();
          this.packageUpdated.emit();
        },
        (err) => {
          this.toast.danger('Failed to update package', 'Failed!');
          event.confirm.reject();
        },
      );
  }

  toggleShowDelivered(value) {

    let status: any = {
      neq: 'Delivered',
    };

    if (value === true) {
      status = 'Delivered';
    }

    this.getPackages(status);
  }

  onUserRowSelect(event) {
    this.selected = event.selected;
  }

  bulkAction(data: NbMenuItem) {
    this.bulkUpdatePackageStatus(data.data);
  }

  bulkUpdatePackageStatus(status: string) {

    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    this.packageApi
      .updatePackageStatus(
        ids,
        status,
      )
      .subscribe(
        (updated) => {
          this.toast.success('Packages updated successfully', 'Success!');
          let pStatus: any = {neq: 'Delivered'};
          this.packageUpdated.emit();
          if (this.showDelivered) {
            pStatus = 'Delivered';
          }
          this.getPackages(pStatus);
          this.selected = [];
        },
        (err) => {
          this.toast.danger(err.message, 'Failed to update packages');
        }
      );
  }
}
