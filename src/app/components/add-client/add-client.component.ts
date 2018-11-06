import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    balance: 0
  }
  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;
  constructor(
    private flashMessages: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd
    console.log("Add, disable balance:", this.disableBalanceOnAdd);
  }
  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessages.show('Please make sure that all required fields are entered correctyly.', {
        cssClass: 'alert-danger', timeout: 5000
      });
    } else {
      this.clientService.newClient(value);
      this.flashMessages.show('New client record has been saved in the database.', {
        cssClass: 'alert-success', timeout: 5000
      });
      this.router.navigate(['/']);
    }
  }
}
