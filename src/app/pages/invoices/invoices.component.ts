import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbMenuService, NbToastrService } from '@nebular/theme';
import { Invoice, InvoiceApi, MailBankApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit, OnDestroy {
  bulkActions = [
    { title: 'Mark as Paid', data: 'Paid' },
    { title: 'Mark as Unpaid', data: 'Unpaid' },
    { title: 'Send Via Email', data: 'Send' },
    { title: 'Regenerate Invoice', data: 'Regenerate' },
    { title: 'Delete Invoice', data: 'Delete' },
  ];
  settings = {
    pager: {
      perPage: 10,
    },
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'View',
          title: '<i class="nb-expand before-dark"></i>',
        },
      ],
    },
    add: {
      inputClass: 'text-black',
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    columns: {
      id: {
        title: 'Id',
        width: '5px',
        type: 'number',
        filter: false,
        editable: false,
        addable: false,
      },
      courierPackageId: {
        width: '10px',
        title: 'Pkg Id',
        type: 'number',
        filter: false,
      },
      customer: {
        title: 'Customer',
        type: 'string',
        filter: false,
      },

      manifestNumber: {
        width: '30px',
        title: 'Manifest Number',
        type: 'number',
        filter: false,
      },
      // sentInEmail: {
      //   title: 'Sent via Email',
      //   type: 'string',
      //   filter: false,
      //   editable: false,
      //   addable: false,
      // },
      amount: {
        title: 'Total',
        type: 'number',
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
  source: LocalDataSource = new LocalDataSource();
  selected: Invoice[] = [];
  bulkButtonSubscription: Subscription;
  isAdmin = false;
  constructor(
    private router: Router,
    private toast: NbToastrService,
    private nbMenuService: NbMenuService,
    private invoiceApi: InvoiceApi,
    private mailbankApi: MailBankApi,
    private courierService: CourierService,
  ) {
    this.isAdmin = localStorage.getItem('role') === 'administrator';

    if ( !this.isAdmin ) {
      this.bulkActions.pop();
    }
  }

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
    this.getInvoices();
  }

  ngOnDestroy() {
    this.bulkButtonSubscription.unsubscribe();
  }

  resetSearch(queryLength) {
    if (!queryLength || queryLength <= 2) {
      this.source.setFilter([]);
    }
  }

  getInvoices(status = 'Unpaid') {
    this.invoiceApi.find({
      where: {
        businessId: this.courierService.getId(),
        status,
      },
      include: [
        {
        relation: 'customer',
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
      {
        relation: 'courierPackage',
        scope: {
          fields: {
            id: true,
            manifestNumber: true
          }
        }
      }
    ],
      order: 'id DESC',
    })
    .pipe(
      map(
        (invoices: Invoice[]) => {
          return invoices.map(invoice => {
            return {
              id: invoice.id,
              courierPackageId: invoice.courierPackageId,
              sentInEmail: invoice.sentInEmail ? 'YES' : 'NO',
              amount: invoice.amount.toFixed(2),
              status: invoice.status,
              manifestNumber: invoice.courierPackage ? invoice.courierPackage.manifestNumber : 'N/A',
              customer: invoice.customer ? `${this.pad(invoice.customer.mailboxes[0].mailboxNumber)}
              ${invoice.customer.firstName} ${invoice.customer.lastName}`: 'Unknown',
            };
          });
        },
      ),
    )
    .subscribe((invoices: any) => {
      this.source = new LocalDataSource(invoices);
    });
  }

  onSearch(query: string = '') {

    if (query === '') {
      return;
    }

    this.source.setFilter([
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
      {
        field: 'manifestNumber',
        search: query,
      },
      {
        field: 'customer',
        search: query,
      },
    ], false);
  }

  onUserRowSelect(event) {
    alert("SELECTED")
    // this.selected = event.selected;
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
      case 'Regenerate':
        this.bulkRegenerateInvoices();
      break;
      case 'Delete':
        this.bulkDelete();
      break;
      default:
        this.toast.default('Unrecognized action', 'Uhhhh! Inc');
        break;
    }
  }

  bulkDelete() {
    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    this.invoiceApi.bulkDelete(ids)
    .subscribe(result => {
      this.toast.success(`${result.success} invoices deleted successfully out of ${result.total}`, 'Process Complete');
      this.getInvoices();
      this.selected = [];
    }, error => {
      this.toast.danger('Failed to delete invoices', 'Failed')
    });
  }

  bulkUpdateInvoiceStatus(status: string) {

    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }

    if (status === 'Paid') {
      const confirmation = confirm('Marking these as paid will automatically send an invoice, Are you sure you want to continue?');
      if (!confirmation) {
        return;
      }
    }

    this.invoiceApi.bulkStatusChange(ids, status)
    .subscribe(result => {
      this.toast.success(`${result.success} invoices successfully marked as ${status} out of ${result.total}`, 'Process Complete');
      this.getInvoices();
      this.selected = [];
    }, error => this.toast.danger('Failed to update invoices ' + error.message, 'Failed!'));

  }

  bulkRegenerateInvoices() {

    const ids = this.selected.map((cPackage) => cPackage.id);
    if (ids.length === 0) {
      return;
    }


    this.invoiceApi.bulkRegenerateInvoices(ids)
    .subscribe(result => {
      this.toast.success(`${result.success} invoices successfully regenerated successfully out of ${result.total}`, 'Process Complete');
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

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.invoiceApi.deleteById(event.data.id)
      .subscribe(deleted => {
        this.toast.success('Invoice successfully deleted', 'Success!');
        event.confirm.resolve();
      }, err => {
        this.toast.danger('Error deleting invoice ' + err.message);
        event.confirm.reject();
      });
    } else {
      event.confirm.reject();
    }
  }

  toggleShowPaid(value) {
    if (value === true) {
      this.getInvoices('Paid');
    } else {
      this.getInvoices();
    }
  }

  pad(value, length = 5) {
    let str = '' + value;
    while (str.length < length) {
      str = '0' + str;
    }
    return `${this.courierService.getPrefix()}-${str}`;
  }

  onCustomAction(event) {
    console.log(event.data)
    if (event.action === 'View') {
      // tslint:disable-next-line: max-line-length
      window.open(`${environment.apiUrl}/api/Invoices/preview?courierId=${this.courierService.getId()}&invoiceId=` + (event.data.manifestNumber ? event.data.manifestNumber : event.data.courierPackageId));
    }
  }

  get invoiceTotal(): number {
    return this.selected.reduce(function(acc, invoice) {
      return (Number(acc) + Number(invoice.amount));
    }, 0);
  }

  onLimitChange(limit) {
    this.settings.pager.perPage = limit;
    this.source.setPaging(1, limit);
  }
}
