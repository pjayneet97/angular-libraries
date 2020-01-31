import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { MyChatsComponent } from '../my-chats/my-chats.component';
import { AllContactsComponent } from '../all-contacts/all-contacts.component';
import { OnsNavigator } from 'ngx-onsenui';
@Component({
  selector: 'ons-page',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tab1 = MyChatsComponent
  tab2 = AllContactsComponent
  name=""
  constructor(private _navigator: OnsNavigator,public chatService:ChatService) {
  }

  ngOnInit() {
  }
  logout(){
    this.chatService.auth.auth.signOut().then(res=>[
      window.location.reload()
    ])
  }
  updateProfile(){
    this.chatService.setProfile(this.name)
  }


  push() {
    this._navigator.element.pushPage(MyChatsComponent);
  }

}
