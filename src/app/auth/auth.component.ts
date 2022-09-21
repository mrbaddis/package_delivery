import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Courier, SDKToken } from 'app/shared/sdk';
import { CourierService } from 'app/shared/services/courier.service';
import { environment } from 'environments/environment';
import { Observable, timer } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authMode = 0;
  authForm: FormGroup;
  versionNumber = environment.version

  isLoading = false;
  hasError = false;
  errorMessage;
  public passwordResetTimer = 0;
  timeLeft = 60;
  accessToken;
  courier$: Observable<Courier>;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toast: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public courierService: CourierService,
  ) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/main']);
    }
   }

  ngOnInit(): void {


    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', []]
    });

    this.route.params.subscribe((res) => {
      // console.log(res);
      if (res.access_token) {
        this.accessToken = res.access_token;
        this.changeMode(2);
      } else {
        this.changeMode(0);
      }
    });

  }

  get email() {
    return this.authForm.controls.email;
  }

  get password() {
    return this.authForm.controls.password;
  }

  get confirmPassword() {
    return this.authForm.controls.confirmPassword;
  }

  submit() {
    this.isLoading = true;
    const email = this.email.value;
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;
    if (this.authMode === 0) {
      this.authService.login(email, password).subscribe((token: SDKToken) => {
        // console.log(token);
        this.isLoading = false;
        this.authService.setCurrentUser(token);
        this.router.navigate(['/main']);
      }, err => {
        this.isLoading = false;
        console.error(err);
        this.toast.danger('There was an error logging in, please try again later.', 'Failed', {
          duration: 5000,
        });
      });
    } else if (this.authMode === 1) {
      this.authService.resetPassword(email).subscribe(res => {
        this.startTimer();
       this.toast.success('A password reset link has been sent to your email. Please allow up to 5 minutes for the email to arrive.', 'Success', {
              duration: 8000,
            });
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.toast.danger('There was an error in trying to reset your password', 'Failed');
      });
    } else if (this.authMode === 2) {
      this.authService.changePassword(password, confirmPassword, this.accessToken).subscribe(res => {
        this.isLoading = false;
        this.toast.success('Password successfully changed, please login to continue', 'Success');
        this.changeMode(0);
      }, error => {
        this.isLoading = false;
        this.toast.danger('There was an error in trying to reset your password', 'Failed')
      });
    }

  }

   matchValues(
    matchTo: string,
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  changeMode(newMode) {
    this.authMode = newMode;
    this.unsetAllValidators();

    switch (this.authMode) {
      case 0:
        this.email.setValidators([Validators.required, Validators.email]);
        this.email.updateValueAndValidity();
        this.password.setValidators([Validators.required, Validators.minLength(8)]);
        this.password.updateValueAndValidity();
        break;

        // case 1:
        // this.email.setValidators([Validators.required, Validators.email]);
        // this.email.updateValueAndValidity();
        // this.password.setValidators([Validators.required, Validators.minLength(8)]);
        // this.password.updateValueAndValidity();
        // this.confirmPassword.setValidators([Validators.required, Validators.minLength(8), this.matchValues('password')]);
        // this.confirmPassword.updateValueAndValidity();
        // break;

      case 1:
        this.email.setValidators([Validators.required, Validators.email]);
        this.email.updateValueAndValidity();
        break;

      case 2:
        this.confirmPassword.setValidators([Validators.required, Validators.minLength(8), this.matchValues('password')]);
        this.confirmPassword.updateValueAndValidity();
        this.password.setValidators([Validators.required, Validators.minLength(8)]);
        this.password.updateValueAndValidity();
        break;

      default:
        this.authMode = 0;
        this.email.setValidators([Validators.required, Validators.email]);
        this.email.updateValueAndValidity();
        this.password.setValidators([Validators.required, Validators.minLength(8)]);
        this.password.updateValueAndValidity();
        break;
    }

  }

  getError(formControlName) {
    const errorsObj = this.authForm.controls[formControlName].errors;
    if (errorsObj.required) {
      return 'This field is required';
    }

    if (errorsObj.email) {
      return 'A valid email address is required';
    }

    if (errorsObj.isMatching) {
      return 'Please ensure both passwords match';
    }

    if (errorsObj.minlength) {
      return 'Passwords must have atleast 8 or more chacters';
    }
  }

  unsetAllValidators() {
    this.email.setValidators([]);
    this.password.setValidators([]);
    this.confirmPassword.setValidators([]);
    this.email.updateValueAndValidity();
    this.password.updateValueAndValidity();
    this.confirmPassword.updateValueAndValidity();
  }

  startTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.passwordResetTimer = this.timeLeft - val;
      if ( this.passwordResetTimer <= 0) {
        abc.unsubscribe();
      }

    });
  }


}
