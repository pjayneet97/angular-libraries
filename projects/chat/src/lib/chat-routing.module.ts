import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyChatsComponent } from './my-chats/my-chats.component';
import { ViewChatComponent } from './view-chat/view-chat.component';


const routes: Routes = [
  {path:'mychats',component:MyChatsComponent},
  {path:'single-chat',component:ViewChatComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ChatRoutingModule { }