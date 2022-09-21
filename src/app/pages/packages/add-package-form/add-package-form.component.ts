import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { CourierPackage, CourierPackageApi, CourierUser, CourierUserApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'ngx-add-package-form',
  templateUrl: './add-package-form.component.html',
  styleUrls: ['./add-package-form.component.scss']
})
export class AddPackageFormComponent implements OnInit {

  packageForm: FormGroup;
  mailboxPrefix;
  merchants = [];
  users = [];
  statuses = [];
  filteredUsers$: Observable<CourierUser[]>;

  constructor(
    private fb: FormBuilder,
    private courierPackageApi: CourierPackageApi,
    private courierUserApi: CourierUserApi,
    private courierService: CourierService,
    private dialogRef: NbDialogRef<AddPackageFormComponent>,
    private toast: NbToastrService
  ) { }

  ngOnInit(): void {
    this.statuses = [
      'Pre Alert',
      'At Warehouse',
      'In Transit',
      'Ready',
      'Delivered'
    ];
    this.merchants = [
      'Amazon',
      'Alibaba',
      'AliExpress',
      'Best Buy',
      'Ebay',
      'Etsy',
      'Macys',
      'Other',
      'Target',
      'Walmart'
    ];
    this.mailboxPrefix = this.courierService.getPrefix();
    this.packageForm = this.fb.group({
      trackingNo: ['', [Validators.required]],
      manifestNumber: ['', []],
      description: ['', [Validators.required]],
      weight: [1, [Validators.required, Validators.min(1), Validators.max(1000)]],
      value: [1, [Validators.required, Validators.min(1)]],
      customsFee: [0, []],
      merchant: ['Amazon', []],
      status: ['Ready', []],
      businessPackage: [false, []],
      ownerId: [null, [Validators.required]],
      courierId: this.courierService.getId()
    });


  }

  cancel() {
    this.dialogRef.close();
  }

  createPackage() {
    const courierPackge = this.packageForm.value;
    console.log(courierPackge);
    this.courierPackageApi.create(courierPackge).subscribe((courierPackage: CourierPackage) => {
      this.toast.success('Package created', 'Success');
      this.packageForm.reset();
      this.dialogRef.close(true);
    }, error => {
      this.toast.danger('Failed to add package: ' + error.message , 'Fail!');
    });
  }

  filterUsers(query: string) {

    var pattern = new RegExp('.*'+query+'.*', "i");

    this.courierUserApi.find({
      fields: {
        id: true,
        firstName: true,
        lastName: true,
        email: true
      },
      where: {
        and: [
          {
            realm: this.courierService.getRealm(),
          },
          {
            or: [
              {
                firstName: {
                  like: query.indexOf(" ") > -1
                  ?  `%${query.substr(0, query.indexOf(" "))}%`
                  : `%${query}%`
                }
              },
              {
                lastName: {
                  like: query.indexOf(" ") > -1
                  ?  `%${query.substr(query.indexOf(" "), query.length - 1)}%`
                  : `%${query}%`
                }
              },
              {
                email: {
                  like: `%${query}%`
                }
              },
              {
                id: {
                  like: `%${query}%`
                }
              }
            ]
          }
        ],

      },
      include: ['mailboxes']
    }).subscribe((users: CourierUser[]) => {
      this.users = users.map(user => {
        return {
          id: user.id.toString(),
          name: `${user.firstName} ${user.lastName}`,
          mailboxNumber: user.mailboxes.length > 0 ? `${this.courierService.padMailboxNumber(user.mailboxes[0].mailboxNumber)}`: 'Unassigned',
        }
      })
    });
  }

  setCustomer(id: string) {
    console.log('Setting customer: ' + id)
    this.packageForm.controls.ownerId.setValue(id);
  }



}
