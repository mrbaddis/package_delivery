import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CourierUser, CourierUserApi, MailBankApi, MailboxApi } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'ngx-customer-profile-form',
  templateUrl: './customer-profile-form.component.html',
  styleUrls: ['./customer-profile-form.component.scss'],
})
export class CustomerProfileFormComponent implements OnInit {
  userForm: FormGroup;
  showPassword = false;
  constructor(
    private fb: FormBuilder,
    private userApi: CourierUserApi,
    private route: ActivatedRoute,
    private toast: NbToastrService,
    private mailbankApi: MailBankApi,
    private courierService: CourierService,
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.userApi
      .findById(this.route.snapshot.params.id)
      .subscribe((user: CourierUser) => {
        this.userForm = this.fb.group({
          firstName: [user.firstName, [Validators.required]],
          lastName: [user.lastName, [Validators.required]],
          email: [{value: user.email, disabled: false}, [Validators.required, Validators.email]],
          phoneNumber: [
            user.contactInformation.mobilePhone,
            [Validators.required],
          ],
          street1: [user.addresses[0].street1, [Validators.required]],
          street2: [user.addresses[0].street2, [Validators.required]],
          city: [user.addresses[0].city, [Validators.required]],
          state: [user.addresses[0].state, [Validators.required]],
          trnNumber: [user.trnNumber, [Validators.required]],
          userCreated: [user.createdOn, []],
        });
      });
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  updateProfile() {
    const formValues = this.userForm.value;

    this.userApi
      .patchAttributes(this.route.snapshot.params.id, {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        contactInformation: {
          mobilePhone: formValues.phoneNumber,
        },
        addresses: [
          {
            street1: formValues.street1,
            street2: formValues.street2,
            city: formValues.city,
            state: formValues.state,
          },
        ],
        trnNumber: formValues.trnNumber,
      })
      .subscribe(
        (updated) => {
          this.toast.success('User profile updated successfully', 'Success!');
          this.loadForm();
        },
        (err) => {
          this.toast.danger(
            'Failed to  updated user profile ' + err.message,
            'Failed',
          );
        },
      );
  }


  sendPasswordResetEmail(email) {
    this.userApi.resetPassword({email, courierId: this.courierService.getId()}).subscribe(_ => {
      this.toast.success('Password reset email sent', 'Success');
    }, error => {
      this.toast.danger(error.message, 'Failed');
    });
  }
}
