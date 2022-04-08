import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { users } from 'src/app/dummyData';
import { newAccount } from 'src/app/interfaces/newAccount';
import { LoginUser, User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { env } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = "";

  userLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient) { }

  isLoggedIn() : BehaviorSubject<boolean> {
    // get token from local storage
    const token = localStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(token);
      // get expiry date
      let currentDate = new Date();
      this.token = parsedToken.token;
      let tokenDate = new Date(parsedToken.timestamp);
      if(currentDate.getTime() < tokenDate.getTime()) { // current date lower than the expiry date
        this.userLogged.next(true);
        return this.userLogged;
      }
      this.userLogged.next(false);
      return this.userLogged;
    }
    this.userLogged.next(false);
    return this.userLogged;
  }

  logIn(userCredentials: LoginUser): void {
    // get the token and store it with a timestamp
    this.http.post<string>(env.apiUrl + '/auth/getToken', userCredentials).subscribe(
      (response) => {
        this.token = response;
        let timestampDate = new Date();
        // add a preffered time for the token to be alive, before expiring
        timestampDate.setDate(timestampDate.getDate() + 1); // Token expires after 1 day
        let obj = {
          token: this.token,
          timestamp: timestampDate.getTime()
        }
        localStorage.setItem('token', JSON.stringify(obj));
        this.router.navigate(['/store']);
        this.userLogged.next(true);
      },
      (error) => {
        if(error.status == 401) {
          alert('Credentials invalid! Please try again!');
        } else {
          alert('An error has been encountered. Please try again later!');
        }
      });
  }

  logOut() : void {
    console.log('logging out');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.userLogged.next(false);
  }

  getToken() : string {
    if(this.token == '') {
      this.isLoggedIn();
    }
    return this.token;
  }

  createNewAccount(account : newAccount): void {
    
    if(account.password == account.confirmPassword) {
      let payload = {
        fullname: account.fullname,
        username: account.username,
        password: account.password,
        is_client: account.is_client
      };
      this.http.post(env.apiUrl + '/users/add', payload).subscribe(() => {
        this.logIn({username: account.username, password: account.password});
      },(error) => {
        alert('We have encountered a problem creating the account. Please try again later.');
        console.log(error);
      });
    } else {
      alert('Passwords do not match!');
    }
  }
}
