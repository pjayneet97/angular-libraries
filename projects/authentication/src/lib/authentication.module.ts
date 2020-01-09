import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';  

import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    AngularFireAuthModule,
    CommonModule,
    FormsModule
  ],
  exports: [AuthenticationComponent]
})
export class AuthenticationModule { }
