import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { OnsNavigator } from 'ngx-onsenui';


@Component({
  selector: 'ons-page',
  templateUrl: './view-chat.component.html',
  styleUrls: ['./view-chat.component.css']
})
export class ViewChatComponent implements OnInit {
  chatMessages=[]
  constructor(private _navigator: OnsNavigator,public chatService:ChatService) {
  }

  push() {
   // this._navigator.element.pushPage(MyChatsComponent);
  }

  pop() {
    this._navigator.element.popPage();
  }

  ngOnInit() {
  }
  getChats(chatroomId){
    this.chatService.getMessagesOfChatByChatRoomId(chatroomId)
  }

}
