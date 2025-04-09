import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Report } from '../../models/report';
import { ReportService } from '../../services/report.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss']
})
export class ReportsPage implements OnInit, OnDestroy {
  reports$: Observable<Report[]>;
  searchTerm: string = '';
  selectedFilter: string = 'all';
  currentUserId: string = '';

  private searchSubject = new Subject<string>();
  private filterSubject = new Subject<string>();
  private destroy$ = new Subject<void>();
  private allReports$: Observable<Report[]>;

  constructor(
    private reportService: ReportService,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private auth: AngularFireAuth
  ) {
    this.initializeObservables();
    this.initializeAuth();
  }

  private async initializeAuth() {
    const user = await this.auth.currentUser;
    this.currentUserId = user?.uid || '';
  }

  ngOnInit() {
    this.loadReports();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeObservables() {
    this.allReports$ = this.reportService.getReports();

    const search$ = this.searchSubject.pipe(
      startWith(this.searchTerm),
      takeUntil(this.destroy$)
    );

    const filter$ = this.filterSubject.pipe(
      startWith(this.selectedFilter),
      takeUntil(this.destroy$)
    );

    this.reports$ = combineLatest([
      this.allReports$,
      search$,
      filter$
    ]).pipe(
      map(([reports, search, filter]) => {
        return reports
          .filter(report => {
            const matchesSearch = search
              ? report.title.toLowerCase().includes(search.toLowerCase()) ||
                report.description.toLowerCase().includes(search.toLowerCase())
              : true;

            const matchesFilter = filter === 'all' || report.status === filter;

            return matchesSearch && matchesFilter;
          })
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      })
    );
  }

  loadReports() {
    this.allReports$ = this.reportService.getReports();
  }

  async createReport() {
    const alert = await this.alertCtrl.create({
      header: 'Create Report',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Report Title'
        },
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Report Description'
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'Priority',
          value: 'low',
          checked: true,
          handler: (input: any) => {
            input.value = input.checked ? 'low' : null;
          }
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'Medium',
          value: 'medium',
          handler: (input: any) => {
            input.value = input.checked ? 'medium' : null;
          }
        },
        {
          name: 'priority',
          type: 'radio',
          label: 'High',
          value: 'high',
          handler: (input: any) => {
            input.value = input.checked ? 'high' : null;
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: async (data) => {
            if (data.title && data.description && data.priority) {
              const now = new Date();
              const newReport: Report = {
                title: data.title,
                description: data.description,
                createdAt: now,
                date: now,
                status: 'pending',
                priority: data.priority,
                reporterId: this.currentUserId,
                userId: this.currentUserId,
                location: ''
              };

              this.reportService.createReport(newReport).subscribe(() => {
                this.loadReports();
              });
            }
          }
        }
      ]
    });
    await alert.present();
  }

  viewReport(report: Report) {
    this.router.navigate(['/app/tabs/reports', report.id]);
  }

  filterReports(event: any) {
    this.selectedFilter = event.detail.value;
    this.filterSubject.next(event.detail.value);
  }

  searchReports(event: any) {
    this.searchTerm = event.detail.value;
    this.searchSubject.next(event.detail.value);
  }
}
