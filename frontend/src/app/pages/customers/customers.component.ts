import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { users } from './../../dummyData'; 

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor() { }

  customers: any = users.filter(el => el.userType == 'client');

  ngOnInit(): void {
    this.customers.map((el: any) => el.orders = 0);
  }

  getCustomerOrders(): Array<any> {
    return this.customers;
  }
}
