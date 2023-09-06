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
  protected messagesMap: Map<String, Set<chatMessage>> = new Map();
  protected messages: chatMessage[] = [];

  constructor(private http: HttpClient, private loggerService: LoggerService, private messagingService: MessagingService, private route: ActivatedRoute) { }

  selectContact(contact: String) {
    console.log(contact);
    this.selectedContact = contact;
    this.messages = Array.from(this.messagesMap.get(contact)|| []).sort((a, b) => a.counter - b.counter);
  }

  sendMessage(message: String) {
    console.log(message);
    const contact = this.selectedContact!!;
    this.contacts.push(contact);
    const counter = this.messagesMap.get(contact)?.size || 0;
    this.messagingService.sendMessage(message, this.selectedContact!!, this.loggerService.getUsername()!!, counter);
    if (!this.messagesMap.has(contact)) {
      this.messagesMap.set(contact, new Set());
    }
    let user = this.loggerService.getUsername()!!;
    let fullMessage = new chatMessage(user, message, contact, counter);
    this.updateMessages(fullMessage, contact);
  }
  
  ngOnInit() {
    this.selectedContact = this.route.snapshot.paramMap.get('contact')
    this.messagingService.message$.subscribe((message) => {
      console.log(message);
      const user = this.loggerService.getUsername()!!;
      if(message.sender == user || message.reciver == user) {
        var otherUser = message.sender;
        if(message.sender == user) {
          otherUser = message.reciver;
        }
        else {
         otherUser = message.sender;
        }
        if (!this.messagesMap.has(otherUser)) {
          this.messagesMap.set(otherUser, new Set());
        }
        this.updateMessages(message, otherUser);
      }

    });
    this.messagingService.getMessages(this.loggerService.getUsername()!!);

  }

   updateMessages(message: chatMessage, otherUser: String) {
    let tmp = Array.from(this.messagesMap.get(otherUser)||[])
        .filter((m) => m.counter != message.counter);
        tmp.push(message);

    this.messagesMap.set(otherUser, new Set(tmp));
    if(this.selectedContact == otherUser){
      this.messages = Array.from(this.messagesMap.get(otherUser)|| []).sort((a, b) => a.counter - b.counter);
    }
    this.contacts = Array.from(this.messagesMap.keys());

  }

}
