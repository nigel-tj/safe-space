import * as firebase from 'firebase/app';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor($scope: any) {
    var user = firebase.auth().currentUser;
    if(user != null){

    }
  }

  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }

  logoutUser(){
    return new Promise<void>((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user)
    })
    // firebase.auth().currentUser;
  }
  currentUserWithScope(){
    var user = firebase.auth().currentUser;
    if(user != null){

    }
    return user;
  }
}
