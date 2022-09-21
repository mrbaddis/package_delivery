import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbIconLibraries, NbToastrService } from '@nebular/theme';
import { CourierUser, CourierUserApi } from 'app/shared/sdk';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { map, tap } from 'rxjs/operators';
import * as EmailValidator from 'email-validator';
import { CourierService } from 'app/shared/services/courier.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'app/shared/services/upload.service';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
})
export class CustomersComponent implements OnInit {
  isAdmin = false;
  processing = false;
  settings = {
    add: {
      inputClass: 'text-black',
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    actions: {
      add: true,
      delete: true,
      edit: false,
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
      mailboxNumber: {
        title: 'Mailbox Number',
        type: 'string',
        filter: false,
        editable: false,
        addable: false,
      },
      name: {
        title: 'Name',
        type: 'string',
        filter: false,
      },
      email: {
        title: 'E-mail',
        type: 'string',
        filter: false,
      },
      phoneNumber: {
        title: 'Phone Number',
        type: 'string',
        filter: false,
      },
    },
  };
  source: LocalDataSource = new LocalDataSource();
  customers: CourierUser[] = [];
  public showAddForm = false;
  acceptedFileTypes = ['.csv'];
  isLoadingMore = false;
  limit = 9;
  offset = 0;
  skip = 0;
  fileUploadForm: FormGroup;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  constructor(
    private usersApi: CourierUserApi,
    private router: Router,
    private toast: NbToastrService,
    private dialogService: NbDialogService,
    private courierService: CourierService,
    private fb: FormBuilder,
    private uploadService: UploadService,
  ) {
    this.isAdmin = localStorage.getItem('role') === 'administrator';
    if (!this.isAdmin) {
      this.settings.actions.delete = false;
      this.settings.actions.add = false;
      delete this.settings.columns.email;
    }
   }

  ngOnInit(): void {
    this.getUsers();

    this.fileUploadForm = this.fb.group({
      file: [null, [Validators.required]],
    });
  }

  importCustomers() {
    if (this.processing) {
      return;
    }

    this.processing = true;
    const formValues = this.fileUploadForm.value;
    this.uploadService.uploadFile(formValues.file, 'Uploads', this.courierService.getId().toString())
    .subscribe(uploadedFile => {
      this.usersApi.importFromCsv(this.courierService.getId(), uploadedFile.name, false)
      .subscribe(importReport => {
        this.processing = false;
        this.toast.success(
          `${importReport.success} customers successfully imported out of ${importReport.total}`, 'File Import Result', {
            duration: 10000,
          });

        if (importReport.failed > 0) {
          this.toast.danger(
            `${importReport.failed} customers failed to be imported`,
            'File Import Failed',
            {
              duration: 10000,
            }
          );
        }

        if (importReport.exists > 0) {
          this.toast.warning(`${importReport.exists} customers were not imported because they already exist`, 'File Import Duplicates', {
            duration: 10000,
          });
        }

        this.fileUploadForm.reset();

        this.getUsers();
      }, err => {
        this.toast.danger(`Failed to import customers ${err.message}`, 'Failed to import')
        this.processing = false;
      });
    }, error => {
      this.processing = false;
      this.toast.danger('Failed to upload file ' + error.message, 'Failed', {
        duration: 10000,
      });
    });
 }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  resetSearch(queryLength) {
    if (!queryLength || queryLength <= 2) {
      this.source.setFilter([]);
    }
  }

  onSearch(query: string = '') {

    if (query.length < 2) {
      return;
    }

    this.source.setFilter([
      {
        field: 'name',
        search: query,
      },
      {
        field: 'mailboxNumber',
        search: query,
      },
      {
        field: 'email',
        search: query,
      },
      {
        field: 'phoneNumber',
        search: query,
      },
    ], false);
  }

  getUsers() {
    this.usersApi.find({
      where: {
        realm: this.courierService.getRealm(),
      },
      // limit: this.limit,
      // offset: this.offset,
      // skip: this.skip,
      include: ['mailboxes'],
      order: 'id DESC',
    }).pipe(
      tap((users: CourierUser[]) => {
        this.customers = users;
      }),
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
      }),
    ).subscribe(tabledUsers => {
      this.source = new LocalDataSource(tabledUsers);
    });
  }

  viewCustomer(event) {
    this.router.navigate(['/pages/customers', event.data.id]);
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.usersApi.deleteById(event.data.id)
      .subscribe(userDeleted => {
        this.toast.success('User successfully deleted', 'User Deleted');
        event.confirm.resolve();
      }, error => {
        this.toast.danger('Failed to delete user');
        event.confirm.reject();
      });
      } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event): void {
    if (!event.newData.name) {
      this.toast.danger('Name is required', 'Add Customer Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.email) {
      this.toast.danger('Email name is required', 'Add Customer Failed');
      event.confirm.reject();
      return;
    } else if (!EmailValidator.validate(event.newData.email)) {
      this.toast.danger('Email name is invalid', 'Add Customer Failed');
      event.confirm.reject();
      return;
    }
    if (!event.newData.phoneNumber) {
      this.toast.danger('Phone number is invalid', 'Add Customer Failed');
      event.confirm.reject();
      return;
    }

    this.usersApi.create({
      email: event.newData.email,
      password: Math.random().toString(36).substr(2, 11),
      realm: this.courierService.getRealm(),
      source: 'Admin',
    }).subscribe((user: CourierUser) => {
      this.usersApi.patchAttributes(user.id, {
        firstName: event.newData.name.substr(0, event.newData.name.indexOf(' ')),
        lastName: event.newData.name.substr(event.newData.name.indexOf(' '), event.newData.name.length),
        contactInformation: {
          mobilePhone: event.newData.phoneNumber,
        },
      }).subscribe(profileUpdated => {
        this.toast.success('User successfully created', 'Success!');
        this.getUsers();
        event.confirm.resolve();
      }, err => {
        this.toast.danger('Failed to update user profile ' + err.mesage, 'Failed');
        event.confirm.reject();
        return;
      });
    }, err => {
      this.toast.danger('Failed to create user ' + err.message, 'Failed!');
      event.confirm.reject();
      return;
    });

  }


}
