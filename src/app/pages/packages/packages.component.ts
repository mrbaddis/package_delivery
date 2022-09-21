import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  NbDialogService,
  NbMenuItem,
  NbMenuService,
  NbToastrService,
  NB_WINDOW,
} from '@nebular/theme';
import {
  CourierPackage,
  CourierPackageApi,
  CourierUser,
  CourierUserApi,
  InvoiceApi,
  LoopBackAuth,
  MailBankApi,
} from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { UploadService } from 'app/shared/services/upload.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { AddPackageFormComponent } from './add-package-form/add-package-form.component';
import { CustomUserSearchComponent } from './custom-user-search/custom-user-search.component';
import { CustomerViewRenderComponent } from './customer-view-render/customer-view-render.component';

@Component({
  selector: 'ngx-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
})
export class PackagesComponent implements OnInit , OnDestroy {
  bulkActions = [
    { title: 'Mark as Pre-Alert', data: 'Pre Alert' },
    { title: 'Mark as At Warehouse', data: 'At Warehouse' },
    { title: 'Mark as In Transit', data: 'In Transit' },
    { title: 'Mark as Ready', data: 'Ready' },
    { title: 'Mark as Delivered', data: 'Delivered' },
    { title: 'Delete Packages', data: 'Delete' },
    // { title: 'Regenerate Invoice', data: 'Regenerated' },
  ];
  settingsFiltered: any = {
    pager: {
      perPage: 50,
    },
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
      delete: false,
      position: 'right',
    },
    columns: {
      customer: {
        title: 'Customer',
        type: 'custom',
        filter: false,
        renderComponent: CustomerViewRenderComponent,
        editor: {
          type: 'custom',
          component: CustomUserSearchComponent,
        },
      },
      trackingNo: {
        title: 'Track No.',
        type: 'string',
        filter: false
      },
      manifestNumber: {
        title: 'Manifest #',
        type: 'string',
        filter: false
      },
      description: {
        title: 'Desc.',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value) =>
          value.length > 10 ? value.substr(0, 10) + '...' : value,
      },
      weight: {
        title: 'Weight',
        type: 'number',
        filter: false,
        width: '10px',
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
  settingsDefault: any = {
    pager: {
      perPage: 50,
    },
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
      delete: false,
      position: 'right',
      // custom: [
      //   {
      //     name: 'View',
      //     title: '<i class="nb-expand"></i>',
      //   },
      // ],
    },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'Id',
        width: '0px',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      customer: {
        title: 'Customer',
        type: 'custom',
        filter: false,
        renderComponent: CustomerViewRenderComponent,
        editor: {
          type: 'custom',
          component: CustomUserSearchComponent,
        },
      },
      trackingNo: {
        title: 'Track No.',
        type: 'string',
        filter: false,
      },
      manifestNumber: {
        title: 'Manifest #',
        type: 'string',
        filter: false
      },
      description: {
        title: 'Desc.',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value) =>
          value.length > 10 ? value.substr(0, 10) + '...' : value,
      },
      value: {
        title: 'Value',
        type: 'number',
        filter: false,
      },
      customsFee: {
        title: 'Cstm Fee',
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
      createdOn: {
        title: 'Date Created',
        type: 'date',
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
  settings: any = {
    pager: {
      perPage: 10,
    },
    selectMode: 'multi',
    // add: {

    //   inputClass: 'text-black',
    //   confirmCreate: true,
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },

    edit: {
      confirmSave: true,
      inputClass: 'text-black',
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      add: false,
      edit: true,
      delete: false,
      position: 'right',
      // custom: [
      //   {
      //     name: 'View',
      //     title: '<i class="nb-expand"></i>',
      //   },
      // ],
    },
    // delete: {
    //   deleteButtonContent: '<i class="nb-trash"></i>',
    //   confirmDelete: true,
    // },
    columns: {
      id: {
        title: 'Id',
        width: '0px',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      customer: {
        title: 'Customer',
        type: 'custom',
        filter: false,
        renderComponent: CustomerViewRenderComponent,
        editor: {
          type: 'custom',
          component: CustomUserSearchComponent,
        },
      },
      trackingNo: {
        title: 'Track No.',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value) =>
          value.length > 10 ? value.substr(0, 10) + '...' : value,
      },
      manifestNumber: {
        title: 'Manifest #',
        type: 'string',
        filter: false
      },
      description: {
        title: 'Desc.',
        type: 'string',
        filter: false,
        valuePrepareFunction: (value) =>
          value.length > 10 ? value.substr(0, 10) + '...' : value,
      },
      value: {
        title: 'Value',
        type: 'number',
        filter: false,
      },
      customsFee: {
        title: 'Cstm Fee',
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
      createdOn: {
        title: 'Date Created',
        type: 'date',
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
  selected: CourierPackage[] = [];
  packageDataSource: LocalDataSource = new LocalDataSource();
  showTable = false;
  showDelivered = false;
  fileUploadForm: FormGroup;
  acceptedFileTypes = ['.csv'];
  menuSubscription: Subscription;
  packages: CourierPackage[] = [];
  @ViewChild('table') table: ElementRef;
  @ViewChild('fileInput', {read: ElementRef}) fileInput: ElementRef;
  isAdmin = false;
  addMenuItems = [
    { title: 'Add Single Package'},
    { title: 'Bulk Import'}
  ]
  onClickSubscription: Subscription;
  constructor(
    private packageApi: CourierPackageApi,
    private invoiceApi: InvoiceApi,
    private toast: NbToastrService,
    private auth: LoopBackAuth,
    private userApi: CourierUserApi,
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private elRef: ElementRef,
    private _renderer: Renderer2,
    private fb: FormBuilder,
    private uploadService: UploadService,
    private dialogService: NbDialogService,
    private mailbankApi: MailBankApi,
    private courierService: CourierService,
  ) {
    this.isAdmin = localStorage.getItem('role') === 'administrator';
    if (!this.isAdmin) {
      this.settings.actions.add = false;
      this.settings.actions.edit = false;
      this.bulkActions.pop();
      delete this.settings.columns.customsFee;
      delete this.settings.columns.value;
      delete this.settings.columns.merchant;
    }
  }

  ngOnInit(): void {
    this.selected = [];
    this.menuSubscription = this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'bulk-actions-menu'),
        map((menuItems) => {
          return {
            title: menuItems.item.title,
            data: menuItems.item.data,
          };
        }),

      )
      .subscribe((menuItem) => this.bulkAction(menuItem));


      this.onClickSubscription = this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'add-menu-context'),
        map(({ item: { title } }) => title),
        // take(1)
      )
      .subscribe(title => {
        this.addPackage(title)

      });

    this.getPackages();

    this.fileUploadForm = this.fb.group({
      file: [null, [Validators.required]],
    });
  }

  addPackage(title: string) {
    console.log('opening dialog')
    if (title.toLowerCase() == 'add single package') {

      this.dialogService.open(AddPackageFormComponent, {
        closeOnEsc: true,
        closeOnBackdropClick: true,
        hasBackdrop: true,
        hasScroll: true,

      })
      .onClose.subscribe((created: boolean) => {
        this.getPackages();
        this.menuSubscription.unsubscribe();
        // this.onClickSubscription.unsubscribe();
      });


    } else {
      this.fileInput.nativeElement.click();
    }
  }



  //Insert TD after THEAD TR *3
  fixTableEdit() {

  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  getPackages(status = {neq: 'Delivered'}) {
    this.packageApi
      .find({
        where: {
          courierId: this.courierService.getId(),
          status,
        },
        order: 'id DESC',
        include: {
          relation: 'owner',
          scope: {
            fields: ['id', 'firstName', 'lastName'],
            include: {
              relation: 'mailboxes',
              scope: {
                fields: {
                  id: true,
                  mailboxNumber: true,
                },
              },
            },
          },
        },
      })
      .pipe(
        tap((packages: CourierPackage[]) => {
          this.packages = packages;
        }),
        map((cPackages: CourierPackage[]) => {
          return cPackages.map((cPackage) => {
            return {
              ...cPackage,
              createdOn: new Date(cPackage.createdOn).toLocaleDateString(),
              customer: JSON.stringify(cPackage.owner),
            };
          });
        })
      )
      .subscribe((cPackages: any[]) => {
        this.packageDataSource = new LocalDataSource(cPackages);
      });
  }

  onPackageSearch(query: string = '') {
    if (query.length < 3) {
      this.packageDataSource.setFilter([]);
      return;
    }

    this.packageDataSource.setFilter(
      [
        {
          field: 'customer',
          search: query,
        },
        {
          field: 'trackingNo',
          search: query,
        },
        {
          field: 'manifestNumber',
          search: query,
        },
        {
          field: 'id',
          search: query,
        },
      ],
      false
    );
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this package?')) {
      this.packageApi.deleteById(event.data.id).subscribe(
        (deleted) => {
          this.toast.success('Package successfully deleted', 'Success!');
          event.confirm.resolve();
        },
        (err) => {
          event.confirm.reject();
        }
      );
    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (!event.newData.customer) {
      this.toast.danger(
        'Choose a customer from the list',
        'Add Package Failed'
      );
      event.confirm.reject();
      return;
    } else {
      event.newData.customer = JSON.parse(event.newData.customer);
    }

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
    if (event.newData.value <= 0) {
      this.toast.danger('Value is invalid', 'Add Package Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.weight) {
      this.toast.danger('Weight is required', 'Add Package Failed');
      event.confirm.reject();
      return;
    } else if (event.newData.weight <= 0) {
      this.toast.danger('Weight is invalid', 'Add Package Failed');
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
        weight: event.newData.weight,
        status: event.newData.status,
        merchant: event.newData.merchant,
        value: event.newData.value ?? 1,
        customsFee: event.newData.customsFee ?? 0,
        ownerId: event.newData.customer.id,
        manifestNumber: event.newData.manifestNumber,
        courierId: this.courierService.getId(),
        createdBy: this.auth.getCurrentUserId() ?? -1,
        source: 'Admin',
      })
      .subscribe(
        (_) => {
          this.toast.success('Package successfully created', 'Success!');
          this.getPackages();
          event.confirm.resolve();
        },
        (err) => {
          this.toast.danger(
            'Failed to create package ' + err.message,
            'Failed!'
          );
          event.confirm.reject();
          return;
        }
      );
  }

  onEditConfirm(event) {
    console.log(event.newData);
    const customerData = JSON.parse(event.newData.customer)
    this.packageApi
      .patchAttributes(event.newData.id, {
        trackingNo: event.newData.trackingNo,
        description: event.newData.description,
        weight: event.newData.weight,
        status: event.newData.status,
        value: event.newData.value,
        customsFee: event.newData.customsFee,
        ownerId: customerData.id,
        manifestNumber: event.newData.manifestNumber,
        merchant: event.newData.merchant,
      })
      .subscribe(
        (cPackage) => {
          this.toast.success('Package successfully updated', 'Success!');
          event.confirm.resolve();
        },
        (err) => {
          this.toast.danger('Failed to update package', 'Failed!');
          event.confirm.reject();
        }
      );
  }

  onUserRowSelect(event) {
    this.selected = event.selected;
  }

  bulkAction(menuItem: NbMenuItem) {

    if (menuItem.data === 'Delete') {
      const confirmation = confirm('Are you sure you want to bulk delete these items');
      if (confirmation) {
        this.bulkPackageDelete();
      }
    } else {

      this.bulkUpdatePackageStatus(menuItem.data);
    }
  }

  bulkPackageDelete() {
    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    let success = 0;
    let failed = 0;
    let count = ids.length;

    ids.forEach(id => {
      this.packageApi.deleteById(id).subscribe(deleted => {
        count--;
        success++;
        if (count === 0) {
          this.toast.success(`${success} packages successfully deleted, ${failed} packages failed to be deleted`, 'Delete Success' );
          this.selected = [];
          this.getPackages();
        }
      }, err => {
        failed++;
      });
    });

  }

  bulkUpdatePackageStatus(status: string) {

    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    if (status === 'Ready') {
      const confirmation = confirm('Marking these as ready will automatically send an invoice, Are you sure you want to continue?');
      if (!confirmation) {
        return;
      }
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


  bulkSendInvoice() {
    const ids = this.selected.map((cPackage) => cPackage.id);

    if (ids.length <= 0) {
      return;
    }

    this.mailbankApi.bulkSendInvoices(ids)
    .subscribe(_ => {
      this.toast.success('Invoices queued up for sending.', 'Success!');
      this.selected = [];
    }, error => {
      this.toast.danger(error.message, 'Failed to Send Invoices');
    });
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

  importPackages() {
    const formValues = this.fileUploadForm.value;
    this.uploadService.uploadFile(formValues.file, 'Uploads', this.courierService.getId().toString())
    .subscribe(uploadedFile => {
      this.packageApi.importPackagesFromCsv(this.courierService.getId(), uploadedFile.name)
      .subscribe(importReport => {


        this.toast.success(
          `${importReport.success} packages successfully imported out of ${importReport.total}`, 'File Import Result', {
            duration: 10000,
          });

        if (importReport.failed > 0) {
          this.toast.danger(
            `${importReport.failed} packages failed to be imported`,
            'File Import Failed',
            {
              duration: 10000,
            }
          );
        }

        if (importReport.exists > 0) {
          this.toast.warning(`${importReport.exists} packages were not imported because they already exist`, 'File Import Duplicates', {
            duration: 10000,
          });
        }

        this.fileUploadForm.reset();

        this.getPackages();
      }, err => {
        this.toast.danger(`Failed to import packages ${err.message}`, 'Failed to import')
      });
    }, error => {
      this.toast.danger('Failed to upload file ' + error.message, 'Failed');
    });
  }

  toggleFields(value) {
    if (value) {
      this.settings = this.settingsFiltered;
    } else {
      this.settings = this.settingsDefault;
    }

  }

  onLimitChange(limit) {
    this.settings.pager.perPage = limit;
    this.packageDataSource.setPaging(1, limit);
  }

}
