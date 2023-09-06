import { Component, EventEmitter, Input, Output } from '@angular/core';
import { chatMessage } from 'src/data/chatMessage';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @Input() messages!: chatMessage[]
  @Input() selectedContact!: String
  @Output() sendMessages = new EventEmitter<String>();
  protected newMessage: String = '';

  constructor() { }

  sendMessage() {
    console.log(this.newMessage);
    this.sendMessages.emit(this.newMessage);
    }

  ngOnInit() {
    console.log("chat component")
    console.log(this.selectedContact);
    console.log(this.messages);
  }

}
