import { Component, OnInit } from '@angular/core';
import { CourierPackage, CourierPackageApi, CourierSettings, CourierUser, CourierUserApi, CourierUserInterface, ThemeSetting } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

  order: Order;
  courierSetting: CourierSettings;
  courierPackage: CourierPackage = new CourierPackage();
  courierPackages: CourierPackage[] = [];
  usersFound: CourierUserInterface[] = [];
  filteredUsers: CourierUser[] = []

  constructor(
    private courierService: CourierService,
    private usersApi: CourierUserApi,
    private packageApi: CourierPackageApi
  ) { }

  ngOnInit(): void {
    this.order = new Order();
    this.order.discount = 0;
    this.order.subtotal = 14.99;
    this.order.total = 14.99
    this.order.tax = 0;
    this.order.taxRate = 0.155;
    this.courierPackages = [
    ]
    this.order.packages = [

    ]
    this.courierService.courierApplication.subscribe(courier => {
      this.courierSetting = courier.courierSetting;

    })
  }

  searchForCustomers(query: string) {

    if (query.length < 3) {
      this.usersFound = []
      return;
    }

    const queryWithoutSpace = {
      realm: this.courierService.getRealm(),
      or: [
        {
          firstName: {
            like: `%${query}%`
          },
        }, {
          lastName: {
            like: `%${query}%`
          }
        },
        {
          email: {
            like: `%${query}%`
          }
        }
      ]

    };

    const queryWithSpace = {
      realm: this.courierService.getRealm(),
      and: [
        {
          firstName: `${query.substr(0, query.indexOf(' '))}`,
        },
        {
          lastName: {
            like: `%${query.substr(query.indexOf(' ') + 1, query.length)}%`
          }
        }
      ]
    }


    this.usersApi.find(
      {
        where: query.indexOf(' ') > -1 ? queryWithSpace : queryWithoutSpace,
        include: ['mailboxes'],
      }
    )
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((users: CourierUser[]) => {
          return users.map(user => {
            return {
              id: user.id,
              mailboxNumber: user.mailboxes.length > 0 ? `${this.courierService.padMailboxNumber(user.mailboxes[0].mailboxNumber)}`: 'Unassigned',
              name: `${user.firstName || 'Profile'} ${user.lastName || 'Incomplete'}`,
              email: user.email,
              phoneNumber: user.contactInformation.mobilePhone,
            };
          });
        })
      )
      .subscribe((users) => {
        this.usersFound = users;
      })
  }

  loadPackagesForCustomer(userId: number) {
    this.packageApi.find({
      where: {
        ownerId: userId,
        courierId: this.courierService.getId(),
        status: 'Ready'
      }
    }).subscribe((courierPackages: CourierPackage[]) => {
      this.courierPackages = courierPackages;
    })
  }

  onPackageGridItemClick(index: number, courierPackage: CourierPackage) {
    this.order.packages.push(courierPackage);
  }

  isPackageInOrder(trackingNo: string) {
    return this.order.packages.findIndex((cPackage => cPackage.trackingNo === trackingNo)) > -1;
  }

  selectOrUnselectAll() {

  }

}

export class Order {
  discount: number;
  subtotal: number;
  total: number;
  tax: number;
  taxRate: number;
  packages: CourierPackage[];
  cashierId: number;
  customerId: number;
  status: string;
  cashCollected: number;
  cardCollected: number;
}
