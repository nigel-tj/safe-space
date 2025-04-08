import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { Database, get, getDatabase, onValue, push, ref, set } from '@angular/fire/database';
import { Auth, authState, user } from '@angular/fire/auth';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.page.html',
  styleUrls: ['./user-reports.page.scss'],
})

export class UserReportsPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  reports = [];
  showForm = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private database: Database,
    private auth: Auth,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
    this.loadReports();
  }

  openReportForm() {
    this.showForm = true;
  }

  async loadReports() {
    if (this.auth.currentUser) {
      const userReportsRef = ref(this.database, `reports/${this.auth.currentUser.uid}`);
      onValue(userReportsRef, (snapshot) => {
        this.reports = [];
        snapshot.forEach((childSnapshot) => {
          const report = childSnapshot.val();
          report.id = childSnapshot.key;
          this.reports.push(report);
        });
      });
    }
  }

  async sendReport(value) {
    if (this.auth.currentUser) {
      const userReportsRef = ref(this.database, `reports/${this.auth.currentUser.uid}`);
      const newReportRef = push(userReportsRef);
      await set(newReportRef, value);
      this.validations_form.reset();
      this.showForm = false;
      this.navCtrl.navigateForward('/home/user-reports');
    }
  }

  async getReport(id: string) {
    if (this.auth.currentUser) {
      const reportRef = ref(this.database, `reports/${this.auth.currentUser.uid}/${id}`);
      const snapshot = await get(reportRef);
      return snapshot.val();
    }
    return null;
  }
}
