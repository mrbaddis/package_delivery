import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbIconLibraries, NbToastrService } from '@nebular/theme';
import {
  CourierPackage,
  CourierPackageApi,
  CourierPackageInterface,
  CourierUser,
  CourierUserApi,
  Invoice,
  InvoiceApi,
} from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';


interface Balance {
  totalOutstanding: number;
  totalPaid: number;
}

interface PackageCount {
  undeliveredPackages: number;
  deliveredPackages: number;
}

@Component({
  selector: 'ngx-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  user: CourierUser;
  balance: Balance;
  packageCount: PackageCount;
  userPackages: CourierPackageInterface[] = [];
  userInvoices: Invoice[] = [];
  refreshInvoices: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isAdmin = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersApi: CourierUserApi,
    private invoiceApi: InvoiceApi,
    private packageApi: CourierPackageApi,
    private iconsLibrary: NbIconLibraries,
    private toast: NbToastrService,
    private location: Location,
    private courierService: CourierService,
    private router: Router,
  ) {
    this.isAdmin = localStorage.getItem('role') === 'administrator';
    iconsLibrary.registerFontPack('fa', {
      packClass: 'fa',
      iconClassPrefix: 'fa',
    });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.loadUser(id);
    this.loadCustomerBalances(id);
    this.loadCustomerPackageCount(id);
  }

  loadUser(id: number) {
    this.usersApi
      .findById(id, {
        include: ['mailboxes'],
      })
      .subscribe((user: CourierUser) => {
        this.user = user;
      }, err => {
        this.toast.danger('An unexpected error occured, try again later.', 'An Error Occured');
        this.router.navigate(['/pages/unknown']);
      });
  }

  loadCustomerBalances(id) {
    this.invoiceApi.getCustomerBalance(id).subscribe((balance: Balance) => {
      this.balance = balance;
    });
  }

  loadCustomerPackageCount(id) {
    this.packageCount = {
      deliveredPackages: 0,
      undeliveredPackages: 0,
    };

    this.packageApi.count({
      status: 'Delivered',
      ownerId: id,
    }).subscribe(count => {
      this.packageCount.deliveredPackages = count.count;
    });

    this.packageApi.count({
      status: {
        neq: 'Delivered',
      },
      ownerId: id,
    }).subscribe(count => {
      this.packageCount.undeliveredPackages = count.count;
    });
  }

  deleteUser() {
    if (window.confirm('Are you sure you want to delete this user')) {
    this.usersApi.deleteById(this.activatedRoute.snapshot.params.id)
    .subscribe(deleted => {
      this.toast.success('User was successfully deleted', 'Success!');
      this.location.back();
    }, err => {
      this.toast.danger('Failed to delete user', 'Failed!');
    });
  }
  }

  sendPasswordResetEmail() {
    this.usersApi.resetPassword({
      email: this.user.email,
      courierId: this.courierService.getId(),
      redirectUrl: 'https://app.gemskycouriers.com',
    }).subscribe(sent => {
      this.toast.success('Password reset email was sent', 'Success!');
    }, err => {
      this.toast.danger(err.message, 'Failed!');
    });
  }

  onRefreshInvoices() {
    this.loadCustomerBalances(this.activatedRoute.snapshot.params.id);
    this.refreshInvoices.next(true);
  }


}
