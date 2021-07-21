import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(7),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [this.uniqueUsername.validate]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(5),
    ]),
  }, { validators: [this.matchPassword.validate] }
  );

  //dependency injection
  constructor(
    private matchPassword: MatchPassword,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
  }

  // if line 52 - checks to see if the form or any elements are invalid
   onSubmit() {
    if (this.authForm.invalid) {
      return;
    }


    // console.log(this.authForm.value)
    this.authService.signup(this.authForm.value).subscribe({
     next: response => {
        // navigate to some other route
      },
      // complete() {
      /** nothing goes here it is not important  */
      // },
      error: err => {
        // console.log(err);
        if (!err.status) {
          this.authForm.setErrors({noConnection: true});
          } else {
          this.authForm.setErrors({ unknownErrors: true });
          }
        }
    });
  }
}
