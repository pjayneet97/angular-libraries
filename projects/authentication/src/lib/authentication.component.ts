import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import * as firebase from 'firebase';
@Component({
  selector: 'lib-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  phone
  loading=false;
  constructor(public auth:AuthenticationService) { }

  ngOnInit() {
    this.auth.mode='emaillogin';
    this.auth.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
      callback(response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        this.auth.signInWithPhone();
      }
    });
    this.auth.windowRef.recaptchaVerifier.render();
  }
  signInWithGoogle(){
    this.loading=true;
    this.auth.googleLogin().then(res=>{
      this.loading=false
      console.log(res)
    }).catch(err=>{
      alert("error")
      this.loading=false;
    })
  }
  signInWithEmail(formData){
    this.loading=true;
    this.auth.loginWithEmail(formData.email,formData.password).then(res=>{
      console.log(res)
      this.loading=false;
    })
  }

  logOut(){
    this.loading=true;
    this.auth.logOut().then(res=>{
      this.auth.mode='emaillogin';
      this.loading=false
    })
  }

  sendOTP(formData) {
    if (formData.phone) { 
      this.loading=true;
       this.phone = '+91' + formData.phone.toString();
      this.auth.signInWithPhone(this.phone).then(result => {
      this.auth.windowRef.confirmationResult = result;
      this.auth.mode='verifyotp'
      this.loading=false;
      console.log("otp Sent")
    })
    .catch( error => {
      console.log(error);
      alert("error occoured");
      this.loading=false
    }); }
  }

  varify(otp) {
    if (otp) {
      this.auth.verifyOTP(otp.toString());
    }
  }
  resend(){
    this.auth.resend(this.phone);
  }
  signupwithemail(formData){
    this.loading=true
    this.auth.createUserWithEmail(formData.email,formData.password,"",formData.name).then(res=>{
      this.loading=false
    })
  }
}
