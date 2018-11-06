import { Component, OnInit } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBlanceOnEdit: boolean = true;
  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private route: ActivatedRoute,
    private settingsService: SettingsService
  ) {

  }

  ngOnInit() {
    this.disableBlanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    console.log("edit", this.disableBlanceOnEdit);
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      this.flashMessage.show('Invalid entry - Please make sure that all required fields are entered correctly.', {
        cssClass: 'alert-danger', timeout: 5000
      });
    } else {
      value.id = this.id;
      this.clientService.updateClient(value);
      this.flashMessage.show('Client record update', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate([`/client/${this.id}`]);
    }
  }
}
