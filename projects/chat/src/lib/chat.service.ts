import { Injectable, Query } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  uid=null;
  profileCompleted=false;
  receiver_uid=null;
  newChatFlag=false;
  contacts=[]
  mychats=[]
  chatMessages=[]
  selectedChatroomId
  viewMode="allChats" // allChats singleChat contacts
  constructor(public auth:AngularFireAuth,private db:AngularFirestore,private http: HttpClient) { 
    auth.authState.subscribe(res=>{
      if(res){
       if(res.uid){
        this.uid=res.uid;
        this.getUserDoc()
        this.getMyChats()
       }
      }
    })
  }
  getUserDoc(){
    this.db.collection('chat_users').doc(this.uid).valueChanges().subscribe((res:any)=>{
      if(res.name){
        this.profileCompleted=true;
      }
      else{
        this.profileCompleted=false;
        console.log('false')
      }
    })
  }
  getMyChats(){
    this.db.collection('chat_users').doc(this.uid).collection('chatrooms',ref=>ref.orderBy('lastMessageTimestamp','desc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        let visibleName=""
        return { id,visibleName, ...data };
      }))
    ).subscribe(res=>{
      this.mychats=res;
      this.getAllContacts()
    })
  }

  getMessagesOfChatByChatRoomId(chatroomId){
    return this.db.collection('chat_users').doc(this.uid).collection('chatrooms').doc(chatroomId).collection('messages',ref=>ref.orderBy('timestamp','asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      this.selectedChatroomId=chatroomId
      this.chatMessages=res
      console.log(res)
      this.viewMode='singleChat'
    })
  }

  sendMessage(message,chatroomId){
    if(chatroomId){
      console.log('one more')
      let requestData={chatroomId:chatroomId,sender_uid:this.uid,message:message}
      this.http.post('https://us-central1-chat-8a723.cloudfunctions.net//sendMessage',{},{params:requestData}).subscribe(res=>{
        console.log('res')
      })
    }
  }
  getAllContacts(){
    this.db.collection('chat_users').valueChanges().subscribe(res=>{
      this.contacts=res
      this.mychats.forEach(chat=>{
        if(chat.type=='personal'){
          chat.members.forEach(member_uid=>{
            if(member_uid!=this.uid){
              this.contacts.forEach(contact=>{
                if(contact.uid==member_uid){
                  chat.name=contact.name;
                }
              })
            }
          })
        }

      })
    })
  }

  openContacts(){
    this.viewMode='contacts'
  }
  openChat(receiver_uid){
    let flag=true;
    this.mychats.forEach(chat => {
      chat.members.forEach(member => {
        if(member===receiver_uid){
         this.getMessagesOfChatByChatRoomId(chat.id)
         flag=false;
        }
      });
    });
    if(flag){
      this.viewMode='singleChat'
      this.receiver_uid=receiver_uid
      this.newChatFlag=true;
    }
  }
  sendNewChatMessage(message,receiver_uid){
    let requestData={receiver_uid:receiver_uid,sender_uid:this.uid,message:message}
    this.http.post('https://us-central1-chat-8a723.cloudfunctions.net//sendMessage',{},{params:requestData}).subscribe(res=>{
      console.log('res')
    })
    setTimeout(() => {
      this.newChatFlag=false;
      this.receiver_uid=null;
      this.openChat(receiver_uid)
    }, 2000);
  }
  logOut(){
    this.auth.auth.signOut().then(res=>[
      window.location.reload()
    ])
  }
  setProfile(name){
    this.db.collection('chat_users').doc(this.uid).update({name:name}).then(res=>{
      console.log("updated profile")
    })
  }
}
