import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database"; 
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";


@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.page.html',
  styleUrls: ['./user-reports.page.scss'],
})

export class UserReportsPage implements OnInit {
  userReportList: AngularFireList<any>;
  userReportRef: AngularFireObject<any>;
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  reports = [];

  

  constructor(private navCtrl: NavController,
  private formBuilder: FormBuilder, private db: AngularFireDatabase) { 

  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl(''),
      number: new FormControl(''),
      message: new FormControl('')
    });
    //this.reports = getUserReports();
  }

  sendReport(value){
    let user = firebase.auth().currentUser;
    let newInfo = firebase.database().ref('reports/'+user.uid).push();
    console.log("TTTTTTTTT"+user.uid);
    newInfo.set(value);
    this.navCtrl.navigateForward('/home/user-reports');

  }

  // Get single object
  getReport(id: string) {
    let user = firebase.auth().currentUser;
    this.userReportRef = this.db.object('/reports/'+user.uid+'/'+ id);
    return this.userReportRef;
  }

  // Get List
  getUserReports() {
    let user = firebase.auth().currentUser;
    this.userReportList = this.db.list('/reports/'+user.uid);
    return this.userReportList;
  }
	      

}
