import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbMenuService, NbToastrService } from '@nebular/theme';
import { CourierPackage, CourierPackageApi, Invoice, InvoiceApi, MailBankApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-customer-invoice-table',
  templateUrl: './customer-invoice-table.component.html',
  styleUrls: ['./customer-invoice-table.component.scss'],
})
export class CustomerInvoiceTableComponent implements OnInit, OnDestroy {
  bulkActions = [
    { title: 'Mark as Paid', data: 'Paid' },
    { title: 'Mark as Unpaid', data: 'Unpaid' },
    { title: 'Send Via Email', data: 'Send' },
  ];
  settings = {
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      position: 'right',
      custom: [
        {
          name: 'view',
          title: '<i class="nb-maximize"></i>',
        }
      ]
    },
    add: {
      inputClass: 'text-black',
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
      courierPackageId: {
        title: 'Package ID',
        type: 'number',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
            ],
          },
        },
      },
      sentInEmail: {
        title: 'Sent via Email',
        type: 'string',
        filter: false,
        editable: false,
        addable: false,
      },
      amount: {
        title: 'Total',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      date: {
        title: 'Date',
        type: 'string',
        filter: false,
        editable: false,
        addable: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: false,
        editable: false,
        addable: false,
      },
    },
  };
  showTable = false;
  showPaid = false;
  selected: Invoice[] = [];
  invoiceDataSource: LocalDataSource = new LocalDataSource();
  @Input() refreshInvoice: BehaviorSubject<boolean> = new BehaviorSubject(false);
  bulkButtonSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private invoiceApi: InvoiceApi,
    private packageApi: CourierPackageApi,
    private toast: NbToastrService,
    private mailbankApi: MailBankApi,
    private nbMenuService: NbMenuService,
    private courierService: CourierService,
  ) { }

  ngOnInit(): void {
    this.bulkButtonSubscription = this.nbMenuService
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
    this.refreshInvoice.subscribe(refresh => {
      if (refresh) {
        this.getInvoices();
        this.refreshInvoice.next(false);
      }
    });
    this.getInvoices();
    this.getPackagesWihoutInvoice();
  }

  ngOnDestroy() {
    this.bulkButtonSubscription.unsubscribe();
  }

  getInvoices(status = 'Unpaid') {
    this.invoiceApi.find({
      where: {
        customerId: this.route.snapshot.params.id,
        status,
      },
      order: 'id DESC',
      include: {
        relation: 'courierPackage',
        fields: {
          id: true,
          manifestNumber: true
        }
      }
    })
    .pipe(
      map(
        (invoices: Invoice[]) => {
          return invoices.map(invoice => {
            return {
              id: invoice.id,
              courierPackageId: invoice.courierPackage.manifestNumber ? invoice.courierPackage.manifestNumber : invoice.courierPackageId,
              sentInEmail: invoice.sentInEmail ? 'YES' : 'NO',
              amount: invoice.amount.toFixed(2),
              status: invoice.status,
              manifestNumber: invoice.courierPackage.manifestNumber
            };
          });
        },
      ),
    )
    .subscribe((invoices: any) => {
      this.invoiceDataSource = new LocalDataSource(invoices);
    });
  }

  onSearch(query: string = '') {

    if (query === '') {
      return;
    }

    this.invoiceDataSource.setFilter([
      {
        field: 'courierPackageId',
        search: query,
      },
      {
        field: 'id',
        search: query,
      },
      {
        field: 'amount',
        search: query,
      },
    ], false);
  }

  viewInvoice(event) {
     window.open(`${environment.apiUrl}/api/Invoices/preview?courierId=${this.courierService.getId()}&invoiceId=` + event.data.courierPackageId);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.invoiceApi.deleteById(event.data.id)
      .subscribe(deleted => {
        this.toast.success('Invoice successfully deleted', 'Success!');
        event.confirm.resolve();
      }, err => {
        this.toast.danger('Failed to delete invoice', 'Failed!');
        event.confirm.reject();
      });
    } else {
      event.confirm.reject();
    }
  }

  getPackagesWihoutInvoice() {
    this.settings.columns.courierPackageId.editor.config.list = [];
    this.packageApi.find({
      where: {
        ownerId: this.route.snapshot.params.id,
      },
    })
    .pipe(
      map((cPackages: CourierPackage[]) => {
        return cPackages.map(cPackage => {
          return {
            title: `${cPackage.id} - ${cPackage.description}`,
            value: cPackage.id,
          };
        });
      }),
    ).subscribe(cPackages => {
      this.settings.columns.courierPackageId.editor.config.list = cPackages;
      this.showTable = true;
    });
  }

  onUserRowSelect(event) {
    this.selected = event.selected;
  }

  bulkAction(menuItem: NbMenuItem) {
    switch (menuItem.data) {
      case 'Paid':
      case 'Unpaid':
        this.bulkUpdateInvoiceStatus(menuItem.data);
      break;
      case 'Send':
        this.bulkSendInvoice();
      break;
      default:
        this.toast.default('Unrecognized action', 'Uhhhh!');
    }
  }

  bulkUpdateInvoiceStatus(status: string) {

    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    this.invoiceApi.bulkStatusChange(ids, status)
    .subscribe(result => {
      this.toast.success(`${result.success} invoices updated successfully out of ${result.total}`, 'Process Complete');
      this.getInvoices();
      this.selected = [];
    }, error => this.toast.danger('Failed to update invoices ' + error.message, 'Failed!'));

  }

  bulkSendInvoice() {
    const ids = this.selected.map((cPackage) => cPackage.id);

    if (ids.length <= 0) {
      return;
    }

    this.mailbankApi.bulkSendInvoices(ids)
    .subscribe(_ => {
      this.toast.success('Invoices queued up for sending.', 'Success!');
      this.showPaid = false;
      this.selected = [];
      this.getInvoices();
    }, error => {
      this.toast.danger(error.message, 'Failed to Send Invoices');
    });
  }

  toggleShowPaid(value) {
    if (value === true) {
      this.getInvoices('Paid');
    } else {
      this.getInvoices();
    }
  }

  onCustomAction(event) {
    if (event.action === 'view') {
      this.viewInvoice(event);
    }
  }

  get invoiceTotal(): number {
    return this.selected.reduce(function(acc, invoice) {
      return (Number(acc) + Number(invoice.amount));
    }, 0);
  }

}
