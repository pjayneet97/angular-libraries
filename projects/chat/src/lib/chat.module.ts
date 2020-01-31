import { NgModule } from '@angular/core';
import { ChatComponent } from './chat.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { ViewChatComponent } from './view-chat/view-chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { MessageFormComponent } from './message-form/message-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TabsComponent } from './tabs/tabs.component';


@NgModule({
  declarations: [ChatComponent, MyChatsComponent, ViewChatComponent, MessageFormComponent, AllContactsComponent, TabsComponent],
  imports: [
    AngularFirestoreModule,
    AngularFireAuthModule,
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    HttpClientModule,
    OnsenModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [TabsComponent, AllContactsComponent, MyChatsComponent,ViewChatComponent],
  exports: [ChatComponent]
})
export class ChatModule { }
