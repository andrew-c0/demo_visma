import { Component, OnInit } from '@angular/core';
import { LoginUser, User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginCredentials: LoginUser = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logUser() : void {
    this.authService.logIn(this.loginCredentials);
  }

}
