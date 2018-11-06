import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Credentials } from '../../models/Login';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: Credentials = {
    email: '',
    password: ''
  };
  showRegister: boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.user.email = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.settingsService.getSettings().allowRegistration;
    console.log("logged in:",this.isLoggedIn,"show register:", this.showRegister);
  }
  onLogOutClick() {
    this.authService.logOut();
    this.flashMessage.show('You are logged out now.', { cssClass: 'alert-success', timeout: 3000 });
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }
}
