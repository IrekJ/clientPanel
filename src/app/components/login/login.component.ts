import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Credentials } from '../../models/Login';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Credentials = {
    email: '',
    password: ''
  };
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if(auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService.login(this.user.email, this.user.password)
      .then(res => {
        this.flashMessage.show('You are logged in.', { cssClass: "alert-success", timeout: 2000 });
        console.log("try to navigate");
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, { cssClass: "alert-danger", timeout: 5000 });
      })
  }
}
