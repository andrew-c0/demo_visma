import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { users } from 'src/app/dummyData';
import { newAccount } from 'src/app/interfaces/newAccount';
import { LoginUser, User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) { }

  isLoggedIn() : BehaviorSubject<boolean> {
    // get token from local storage
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const parsedToken = JSON.parse(token);
      // get expiry date
      let currentDate = new Date();
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
    if( this.validateLogin(userCredentials)) {
      let timestampDate = new Date();
      // add a preffered time for the token to be alive, before expiring
      timestampDate.setDate(timestampDate.getDate() + 1); // Token expires after 1 day
      let obj = {
        token: btoa(userCredentials.username + '|' + userCredentials.password),
        timestamp: timestampDate.getTime()
      }
      localStorage.setItem('token', JSON.stringify(obj));
      this.router.navigate(['/store']);
      this.userLogged.next(true);
    } else {
      alert('Credentials not valid! Try again!')
    }
  }

  logOut() : void {
    console.log('logging out');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.userLogged.next(false);
  }

  validateLogin(userCredentials: LoginUser): boolean {
    let userExists = users.filter(el => el.username == userCredentials.username && el.password == userCredentials.password);
    if(userExists.length > 0) {
      return true;
    }
    return false;
  }

  userAlreadyExists(account: newAccount): boolean {
    let duplicate = users.filter(el => el.username == account.username);
    if(duplicate.length == 0) {
      return false;
    }
    return true;
  }

  createNewAccount(account : newAccount): void {
    let newUser: User = {
      username: account.username,
      password: account.password,
      userType: 'client'
    }
    if(this.userAlreadyExists(account)) {
      alert('User already exists! Try another username.');
    } else {
      users.push(newUser);
      let credentials: LoginUser = {
        username: account.username,
        password: account.password
      }
      this.logIn(credentials);
    }
  }
}
