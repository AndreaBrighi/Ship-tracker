import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { MessagingService } from '../messaging.service';
import { chatMessage } from 'src/data/chatMessage';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent {

  protected contacts: String[] = [];
  protected selectedContact : String | null = null;
  protected messages: Map<String, chatMessage[]> = new Map();

  constructor(private http: HttpClient, private loggerService: LoggerService, private messagingService: MessagingService, private route: ActivatedRoute) { }

  selectContact(contact: String) {
    console.log(contact);
    this.selectedContact = contact;
  }

  sendMessage(message: String) {
    console.log(message);
    const contact = this.selectedContact!!;
    this.contacts.push(contact);
    this.messagingService.sendMessage(message, this.selectedContact!!, this.loggerService.getUsername()!!);
    if (!this.messages.has(contact)) {
      this.messages.set(contact, []);
    }
    this.messages.get(contact)?.push(new chatMessage(this.loggerService.user!!.username, message, contact));
  }
  
  ngOnInit() {
    this.selectedContact = this.route.snapshot.paramMap.get('contact')
    this.messagingService.message$.subscribe((message) => {
      console.log(message);
      const user = this.loggerService.getUsername()!!;
      if(message.sender == user || message.reciver == user) {
        console.log("in");
        if (!this.messages.has(message.reciver)) {
          this.messages.set(message.reciver, []);
        }
        if(message.sender == user) {
          console.log("sender");
          this.messages.get(message.reciver)?.push(message);
        }
        else {
          console.log("reciver");
          this.messages.get(message.sender)?.push(message);
        }
      }
      this.contacts = Array.from(this.messages.keys());

    });
    this.contacts = [];
    this.messages = new Map();
    this.messagingService.getMessages(this.loggerService.getUsername()!!);

  }

}
