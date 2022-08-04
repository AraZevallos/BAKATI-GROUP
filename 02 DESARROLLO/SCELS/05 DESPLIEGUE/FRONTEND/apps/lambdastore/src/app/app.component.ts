import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../../libs/users/src/lib/services/users.service';

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private UsersService: UsersService){

  }

  ngOnInit(): void {
    this.UsersService.initAppSession();
  }

  title = 'lambdastore';
}
