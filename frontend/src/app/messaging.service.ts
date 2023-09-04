import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { chatMessage } from 'src/data/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  public message$: BehaviorSubject<chatMessage> = new BehaviorSubject(new chatMessage('', '', ''));
  private socket: any;
  constructor() {
    this.socket = io('http://backend:3001');
  }


  public sendMessage(message: String, reciever: String) {
    console.log('sendMessage: ', message)
    this.socket.emit('newMessage', message);
  }

  public getNewMessage() {
    this.socket.on('allMessages', (messages: chatMessage[]) =>{
      console.log('allMessages: ', messages)
      messages.forEach(message => {
        this.message$.next(message);
      });
    });

    this.socket.on('newMessage', (message: chatMessage) =>{
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  public getMessages(user: String){
    this.socket.emit('requestConnection', {name: user});
    this.socket.emit('getMessages',{sender: user});
  }
}
