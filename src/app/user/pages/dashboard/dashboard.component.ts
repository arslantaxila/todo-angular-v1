import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  id: any;
  name: any
  todayDate: any;
  low_todo: any;
  medium_todo: any;
  high_todo: any;
  complete_todo: any;
  passed_duedate_todo: any;

  constructor(
    private datePipe: DatePipe,
    private userService: UserService
  ) { }
  ngOnInit() {
    this.getDashboardcount();
    this.id = localStorage.getItem('id');
    this.name = localStorage.getItem('name');
    this.todayDate = new Date();

  }

  getDashboardcount() {
    const d = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd'
    )
    this.userService.getDashbaordCount(d).subscribe((dcount) => {
      // console.log(dcount)
      this.low_todo = dcount[0].low_todo;
      this.medium_todo = dcount[0].medium_todo;
      this.high_todo = dcount[0].high_todo;
      this.complete_todo = dcount[0].complete_todo;
      this.passed_duedate_todo = dcount[0].passed_duedate_todo;

    });
  }

  get getDatePipe() {
    return this.datePipe;
  }


}
