import { Observable, from } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:3000/api/reports';

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private http: HttpClient
  ) {}

  async sendReport(reportData: any) {
    const user = await this.auth.currentUser;
    if (!user) {
      throw new Error('User not authenticated');
    }

    const reportsRef = this.db.list(`reports/${user.uid}`);
    return from(reportsRef.push(reportData));
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
