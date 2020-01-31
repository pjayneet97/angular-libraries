import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'lib-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {
  @Input() chatroomId;
  message:any
  constructor(public chatService:ChatService) { }

  ngOnInit() {
  }
  sendMessage(){
    console.log('in send')
    if(this.chatService.newChatFlag){
      this.chatService.sendNewChatMessage(this.message,this.chatService.receiver_uid)
    }
    else{
      this.chatService.sendMessage(this.message,this.chatroomId)
    }
    this.message=""
  }

}
