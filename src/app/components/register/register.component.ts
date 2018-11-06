import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Credentials } from '../../models/Login';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      if (auth) {
        this.authService.logOut()
      }
    });
  }

  onSubmit() {
    this.authService.register(this.user)
      .then(res => {
        this.flashMessage.show(`New user record for: ${this.user.email} had been created`, {
          cssClass: 'alert-success', timeout: 4000
        })
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
      });
  }
}
