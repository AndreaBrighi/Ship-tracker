import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chat-contacts',
  templateUrl: './chat-contacts.component.html',
  styleUrls: ['./chat-contacts.component.scss']
})
export class ChatContactsComponent {

  @Input() contacts!: String[]
  @Output() selectContact = new EventEmitter<String>();

  constructor() { }

  select(contact: String) {
    this.selectContact.emit(contact);
  }

}
