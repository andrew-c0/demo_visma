import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { newAccount } from 'src/app/interfaces/newAccount';
import { AuthService } from './../../../services/auth/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createAccountData: newAccount = {
    username: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  createAccount(): void {
    if(this.createAccountData.password == this.createAccountData.confirmPassword) {
      this.authService.createNewAccount(this.createAccountData);
    } else {
      console.log('password incorrect');
    }
  }

}
