import { Component, OnInit } from '@angular/core';

import { GenericService } from '../generic.service';
import { Contact } from '../contact';
import { SubService } from '../service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contacts: Contact[] = [];
  public subServicesTitles = {};
  public towns = {};

  public order: string = 'ASC';
  public processed: boolean = false;

  constructor(private genericService: GenericService) { }

  ngOnInit() {
    this.genericService.getResources('SubServices', {properties: '["title"]'}).subscribe(subServices => {
      for (let i = 0; i < subServices.length; i++) {
        this.subServicesTitles[subServices[i].id] = subServices[i].title;
      }
      this.getContacts();
    });
  }

  getContacts() {
    const query = {order: `[{"property":"creationDate", "type":"${this.order}"}]`};
    if (this.processed !== null) {
      query['processed'] = this.processed ? 1 : 0;
    }
    this.genericService.getResources('Contacts', query).subscribe(contacts => {
      for (let i = 0; i < contacts.length; i++) {
        if (contacts[i].informations) {
          contacts[i].informations = contacts[i].informations.replace(new RegExp("\n", "g"),'<br/>');
        }
        if (contacts[i].town) {
          this.towns[contacts[i].town] = JSON.parse(contacts[i].town);
        }
      }
      this.contacts = contacts;
    });
  }

  load() {
    this.getContacts();
  }

  save(contact: Contact) {
    this.genericService.setResource('Contact', {id: contact.id, processed: contact.processed}).subscribe(subServices => {
      alert('sauvegarde effectuée');
    });
  }

}
