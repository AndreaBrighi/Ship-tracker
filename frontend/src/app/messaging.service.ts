import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { chatMessage } from 'src/data/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public message$: BehaviorSubject<chatMessage> = new BehaviorSubject(new chatMessage('', '', '', 0));
  private socket: any;
  constructor() {
    this.socket = io('http://backend:3001');
  }


  public sendMessage(message: String, reciever: String, username: String, counter: number = 0) {
    console.log('sendMessage: ', message)
    const fullMessage = new chatMessage(username, message, reciever, counter);
    this.socket.emit('sendMessage', JSON.stringify(fullMessage));
  }

  public resetMessages() {
    this.message$ = new BehaviorSubject(new chatMessage('', '', '', 0));
  }

  public getMessages(user: String){
    this.socket.emit('requestConnection', JSON.stringify({name: user}));
    this.socket.emit('getMessages',JSON.stringify({sender: user}));
    this.socket.on('allMessages', (messagesString: string) =>{
      console.log("allMessages");
      const messages: chatMessage[] = JSON.parse(messagesString);
      console.log(messages)
      messages.forEach(message => {
        this.message$.next(message);
      });
    });

    this.socket.on('newMessage', (message: chatMessage) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };
}
