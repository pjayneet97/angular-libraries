import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { OnsNavigator } from 'ngx-onsenui';
import { ViewChatComponent } from '../view-chat/view-chat.component';

@Component({
  selector: 'ons-page',
  templateUrl: './my-chats.component.html',
  styleUrls: ['./my-chats.component.css']
})
export class MyChatsComponent implements OnInit {
  
  constructor(private _navigator: OnsNavigator,public chatService:ChatService) { }

  push(id) {
    this.chatService.getMessagesOfChatByChatRoomId(id)
    this._navigator.element.pushPage(ViewChatComponent);
  }
  ngOnInit() {
  }


}
