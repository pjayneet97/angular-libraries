import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';  

import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCG0rcc-R7bBSSgoJD4V7FsEW9S_rCvPgc",
      authDomain: "chat-8a723.firebaseapp.com",
      databaseURL: "https://chat-8a723.firebaseio.com",
      projectId: "chat-8a723",
      storageBucket: "chat-8a723.appspot.com",
      messagingSenderId: "868038804017",
      appId: "1:868038804017:web:e0f3f645ba1e06a2948b10",
      measurementId: "G-RFY323LJ3K"
    }),
    AngularFireAuthModule,
    CommonModule,
    FormsModule
  ],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule { }
