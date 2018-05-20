import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name = '';
  public password = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loginService.login(this.name, this.password).subscribe(token => {
      console.log('connected');
    });
  }

}
