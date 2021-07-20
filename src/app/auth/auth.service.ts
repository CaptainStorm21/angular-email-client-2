import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      credentials
    )
  }
}
