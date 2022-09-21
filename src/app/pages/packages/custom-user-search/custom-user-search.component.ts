import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CourierApi, CourierUser, CourierUserApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { DefaultEditor } from 'ng2-smart-table';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-custom-user-search',
  templateUrl: './custom-user-search.component.html',
  styleUrls: ['./custom-user-search.component.scss'],
})
export class CustomUserSearchComponent extends DefaultEditor implements AfterViewInit {
  users: any[] = [];
  filteredUsers$: Observable<any[]>;

  @ViewChild('autoInput') input: ElementRef;
  constructor(
    private userApi: CourierUserApi,
    private courierService: CourierService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    if (this.cell.newValue !== '') {
      const user = JSON.parse(this.cell.getValue());
      this.input.nativeElement.value = `${user.firstName} ${user.lastName} ${this.pad(user.mailboxes[0].mailboxNumber)}`;
    }
    this.getCustomerList();
  }



  getCustomerList() {
    this.userApi.find({
      where: {
        realm: this.courierService.getRealm(),
      },
      fields: {
        id: true,
        firstName: true,
        lastName: true,
        mailboxes: true,
      },
      include: {
        relation: 'mailboxes',
        scope: {
          fields: {
            id: true,
            mailboxNumber: true,
          },
        },
      },
    })
    .pipe(map((users: any[]) => {
        return users.map(user => {
          return {
            ...user,
            combined: `${user.firstName} ${user.lastName} ${this.pad(user.mailboxes[0].mailboxNumber)}`,
          };
        });
    }))
    .subscribe((userList: []) => {
      this.users = userList;
    });
  }

  pad(value, length = 5) {
    let str = '' + value;
    while (str.length < length) {
      str = '0' + str;
    }
    return `${this.courierService.getRealm()}-${str}`;
  }

  private filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.users.filter(user =>
      user.combined.toLowerCase().includes(filterValue)
    );
  }

  getFilteredOptions(value: string): Observable<any[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredUsers$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.cell.setValue(JSON.stringify($event));
  }




}
