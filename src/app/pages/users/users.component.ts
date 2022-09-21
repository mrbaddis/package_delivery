import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CourierUserApi, Role, RoleMapping, RoleMappingApi } from 'app/shared/sdk';
import { CourierUser } from 'app/shared/sdk/models/CourierUser';
import { environment } from 'environments/environment';
import { LocalDataSource } from 'ng2-smart-table';
import { map } from 'rxjs/operators';
import * as EmailValidator from 'email-validator';
import { RoleApi } from 'app/shared/sdk/services/custom/Role';
import { CourierService } from 'app/shared/services/courier.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
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
      // add: false,
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
      role: {
        title: 'Role',
        type: 'string',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [],
          },
        },
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
  userListReady = false;
  userRolesReady = false;
  source: LocalDataSource = new LocalDataSource();
  constructor(
    private usersApi: CourierUserApi,
    private router: Router,
    private toast: NbToastrService,
    private roleMapping: RoleMappingApi,
    private roleApi: RoleApi,
    private courierService: CourierService,
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
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

    this.source.setFilter(
      [
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
      ],
      false,
    );
  }

  pad(value, length = 5) {
    let str = '' + value;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  getRoles() {
    this.roleApi
      .find()
      .pipe(
        map((roles: Role[]) => {
          return roles.map(role => {
            return {
              value: role.id,
              title: role.name,
            };
          });
        }),
      )
      .subscribe(mappedRoles => {
        this.userRolesReady = true;
        this.settings.columns.role.editor.config.list = mappedRoles;
      });
  }

  getUsers() {
    this.usersApi
      .getAdministrators(this.courierService.getRealm())
      .pipe(
        map((users: CourierUser[]) => {
          return users.map((user) => {
            // console.log(user);
            return {
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              phoneNumber: user.contactInformation.mobilePhone,
              role: user.roles.length > 0 ? user.roles[0].name : '',
            };
          });
        }),
      )
      .subscribe((tabledUsers) => {
        this.userListReady = true;
        this.source = new LocalDataSource(tabledUsers);
      }, err => {
        this.toast.danger('Oops, something unexpected happened ' + err.message, 'Failed');
      });
  }

  viewCustomer(event) {
    this.router.navigate(['/pages/customers', event.data.id]);
  }

  onDeleteConfirm(event): void {
    if (
      window.confirm(
        'Are you sure you want to revoke admin access for this user?',
      )
    ) {
      this.roleMapping
        .findOne({
          where: {
            principalId: event.data.id,
          },
        })
        .subscribe(
          (role: RoleMapping) => {
            this.roleMapping.deleteById(role.id).subscribe(
              (deleted) => {
                this.toast.success('User access revoked', 'Success');
                this.getUsers();
                event.confirm.resolve();
              },
              (err) => {
                this.toast.danger(
                  'Failed to delete user role ' + err.message,
                  'Failed',
                );
                event.confirm.reject();
              },
            );
          },
          (err) => {
            this.toast.danger(
              'Failed to find user role ' + err.message,
              'Failed',
            );
            event.confirm.reject();
          },
        );
    } else {
      event.confirm.reject();
    }
  }

  async onCreateConfirm(event): Promise<void> {
    // console.log(event.newData)
    if (!event.newData.name) {
      this.toast.danger('First name is required', 'Add Customer Failed');
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

    let userFound: CourierUser;
    try {
      userFound = (await this.usersApi
        .findOne({ where: { email: event.newData.email } })
        .toPromise()) as CourierUser;
    } catch (error) {
      userFound = null;
    }

    if (userFound) {
      this.roleMapping
        .create({
          principalType: 'USER',
          principalId: userFound.id,
          roleId: event.newData.role,
        })
        .subscribe(
          (role) => {
            this.toast.success('User was added to the team', 'Success!');
            event.confirm.resolve();
          },
          (err) => {
            this.toast.danger('Failed to assign user role', 'Failed!');
            event.confirm.resolve();
          },
        );
    } else {
      this.usersApi
      .create({
        email: event.newData.email,
        password: Math.random().toString(36).substr(2, 11),
        realm: this.courierService.getRealm(),
      })
      .subscribe(
        (user: CourierUser) => {
          this.usersApi
            .patchAttributes(user.id, {
              firstName: event.newData.name.substr(
                0,
                event.newData.name.indexOf(' '),
              ),
              lastName: event.newData.name.substr(
                event.newData.name.indexOf(' '),
                event.newData.name.length,
              ),
              contactInformation: {
                mobilePhone: event.newData.phoneNumber,
              },
            })
            .subscribe(
              (profileUpdated) => {
                this.roleMapping
                  .create({
                    principalType: 'USER',
                    principalId: user.id,
                    roleId: event.newData.role,
                  })
                  .subscribe(
                    (role) => {
                      this.toast.success(
                        'User successfully created and assigned to the team',
                        'Success!',
                      );
                      event.confirm.resolve();
                    },
                    (err) => {
                      this.toast.danger(
                        'Failed to assign user role',
                        'Failed!',
                      );
                      event.confirm.resolve();
                    },
                  );
              },
              (err) => {
                this.toast.danger(
                  'Failed to update user profile ' + err.mesage,
                  'Failed!',
                );
                event.confirm.reject();
                return;
              },
            );
        },
        (err) => {
          this.toast.danger('Failed to create user ' + err.message, 'Failed!');
          event.confirm.reject();
          return;
        },
      );
    }
  }
}
