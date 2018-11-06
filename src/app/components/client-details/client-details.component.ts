import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      if (!client) {
        this.client = null;
      } else {
        this.client = client;
        this.hasBalance = this.client.balance > 0;
      }
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessages.show('Client record removed.', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }
  updateBalance() {
    this.clientService.updateClient(this.client);
    this.showBalanceUpdateInput = false;
    this.flashMessages.show("Balance updated", { cssClass: 'alert-success', timeout: 3000 });
  }
}


