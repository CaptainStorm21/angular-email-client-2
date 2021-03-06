import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

interface UsernameAvailableResponse
{
  available: boolean;
}

interface SignupCredentials
{
  username: string;
  password: string;
  passwordConfirmation: string;
}

interface SignupResponse {
  username: string;
}

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  rootUrl = 'https://api.angular-email.com';
  // $ is to identify that this is an obvservable
  signedin$ = new BehaviorSubject(false);

  // dependency injection
  constructor(
    private http: HttpClient
  ) { }

  usernameAvailable(username: string) {
   return this.http
     .post<UsernameAvailableResponse>(
       this.rootUrl + '/auth/username',
      //  `${this.rootUrl}/auth/username`;
       {
        username
      });
  }

  //                  this is interface line 9
  signup(credentials: SignupCredentials) {
    //                  this is interface line 16
    return this.http.post<SignupResponse>(
      this.rootUrl + '/auth/signup',
      credentials, {
        withCredentials: true
      }).pipe(
      // Remember, that tap is essentially just a little thing that allows us to kind of reach in, intercept
      // a value and do something based upon it.
      // It doesn't transform the underlying value or anything like that.
      tap(() => {
        this.signedin$.next(true);
      })
    );
  }


  //to check if a person is signed in
  checkAuth() {
    return this.http.get(`${this.rootUrl}/auth/signedin`, {
      withCredentials: true
    })
      .pipe(
        tap(response => {
          console.log(response)
        })
      );
  }

}


// withCredentilas creates cookies
// in headers in dev
// environment
// network headers

// console should show authentications status : true 
