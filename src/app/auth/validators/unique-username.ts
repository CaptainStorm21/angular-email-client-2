import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
// need to look up a right definition for this operator
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class UniqueUsername implements AsyncValidator {
  constructor(private authService: AuthService) {}

  validate = (control: FormControl) => {
    const { value } = control;
    // console.log(value);
    // console.log(this.http);
    // return null;

    //            generic annotation
    // we are telling TS that we are getting any kind ov value
    // as a result of this post request

    // open devtools and click on network request start typing a username
    // after 3rd character, watch the validation happen sycnh then asynch
    // in short
    // angualr rules local validations then sends a request to the backend
    // once the local validation had been passed

    // if you enter "asdf" --- response will be  "in use"
    // if you enter 'dude' --- response will be 'available

    return this.authService.usernameAvailable(value).pipe(
        // map(value => {
        // console.log(value);
        // if (value.available) {
        //   return null;
        // }
        // return null;

        map(value => {
          if (value.available) {
            return null;
          }
        }),
        catchError((err) => {
          // console.log(err);
          if (err.error.username) {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ nonConnection: true });
          }
          /*
        we will return a new observable as well so we can return an observable by using
        that throw error operation or in our case we do not want to continie on this error.
        instead we want to have some other object like this right not here through out the pipe
        .. we need to return

        as a new obserable that i going to emit an object liek that.
        we can either create a new obserable from sracth and emit it by hand or we could use the buildt in operater
        "of" .. "of" is a shortcut of creating a new obserable
        this operator is going to take in some value, it is going to emit that value.
        */
        })
      );
  }
}
/*
    because the only alternative is that the username is not available.
    If the username is not available in the observable, is going to emit an air object.
    And if the observable emits an air object, remember, Eyre's completely skip over some operators and
    the map statement is one of those of the observable emits an error.
    It is not going to go through a map.
    Instead, it's just going to immediately be emitted as an air object.
    In other words, right now, we don't really have to do any checking inside the map statement, because
    the only way that we're ever going to get into this map function is if the request was successful,
    we could really just reduce this down to saying, yeah, just go ahead.
    And no matter what, return null, because if we get a successful request right here, that means that
    the username is not in use.
    The only reason I show you this kind of all featured way like so is if we had an API that returned a
    success endpoint or a success response, even if the username wasn't available.
    */
