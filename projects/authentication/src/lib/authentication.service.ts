import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase'; 


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authInfo=null;
  windowRef:any;
  mode;
  authType=null;
  constructor(public afAuth:AngularFireAuth) {
    this.windowRef = window;
    afAuth.authState.subscribe(res=>{
      this.authInfo=res;
      if(this.authType=='email'){
        if(res){
          if(res.emailVerified){
            this.mode='successful'
          }
          else{
            this.mode='emailverify'
          }
        }
      }
      else if(this.authType=='phone'){
        this.mode='successful';
      }
    })
   }

  isAuthenticated(){
    if(this.authInfo){
      return true;
    }
    else{
      return false;
    }
  }
  googleLogin() {
    this.authType='email';
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
  }
  loginWithEmail(email:string,password:string){
    this.authType='email';
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }
  createUserWithEmail(email,password,photoURL,displayName){
    this.authType='email';
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res=>{
      this.updateProfile(displayName,photoURL);
      this.sendEmailVerification()
    })
  }
  signInWithPhone(phoneNo) {
    this.authType='phone';
    const appVerifier = this.windowRef.recaptchaVerifier;
    return this.afAuth.auth.signInWithPhoneNumber(phoneNo,appVerifier)
  }

  resend(phoneNo){
    this.authType='phone'
    const appVerifier = this.windowRef.recaptchaVerifier;
    return this.afAuth.auth.signInWithPhoneNumber(phoneNo,appVerifier)
  }

  verifyOTP(otp) {
    this.authType='phone';
    return this.windowRef.confirmationResult.confirm(otp)
  }

  logOut() {
    this.authInfo=null;
    return this.afAuth.auth.signOut();
  }
  getauthDetails(){
    return this.authInfo;
  }
  sendEmailVerification(){
    this.afAuth.auth.currentUser.sendEmailVerification()
  }
  updateProfile(displayName,photoURL){
    return this.afAuth.auth.currentUser.updateProfile({displayName,photoURL})
  }
  updatePassword(newPassword){
    return this.afAuth.auth.currentUser.updatePassword(newPassword)
  }
  isEmailVerified(){
    return this.authInfo.emailVerified
  }



  
}
