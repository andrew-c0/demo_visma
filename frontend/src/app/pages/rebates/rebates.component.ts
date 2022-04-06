import { Component, OnInit } from '@angular/core';
import { rebates } from 'src/app/dummyData';
import { Rebate } from 'src/app/interfaces/rebates';

@Component({
  selector: 'app-rebates',
  templateUrl: './rebates.component.html',
  styleUrls: ['./rebates.component.scss']
})
export class RebatesComponent implements OnInit {

  rebatesList: Rebate[] = rebates;

  constructor() { }

  ngOnInit(): void {
  }

}
