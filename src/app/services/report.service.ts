import { Injectable, Inject } from '@angular/core';
import {
  Database,
  ref,
  push,
  set
} from 'firebase/database';
import { Auth } from 'firebase/auth';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(
    @Inject('database') private database: Database,
    @Inject('auth') private auth: Auth,
    private http: HttpClient
  ) {}

  async sendReport(reportData: any) {
    if (!this.auth.currentUser) {
      throw new Error('User not authenticated');
    }

    const reportsRef = ref(this.database, `reports/${this.auth.currentUser.uid}`);
    const newReportRef = push(reportsRef);
    return from(set(newReportRef, reportData));
  }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl);
  }

  getReport(id: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/${id}`);
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, report);
  }

  updateReport(id: string, report: Report): Observable<Report> {
    return this.http.put<Report>(`${this.apiUrl}/${id}`, report);
  }

  deleteReport(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
