import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // lines 21 through 24[] is synch
  // if we want asynch, we need to add on line 21 after , [this.uniqueusername.validate]

  // in order to elimintae a number of request we need to run synch first to meet
  // all the params then send a single request to api call

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
    private uniqueUsername: UniqueUsername

  ) { }

  ngOnInit(): void {
  }

}
