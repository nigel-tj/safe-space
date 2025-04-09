import { Database, child, get, push, ref, set } from '@angular/fire/database';
import { Observable, from } from 'rxjs';

import { Auth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(
    private database: Database,
    private auth: Auth,
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
