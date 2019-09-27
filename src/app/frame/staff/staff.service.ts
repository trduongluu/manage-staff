import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Staff } from './staff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  domain = 'localhost';
  port = '5001';
  // api urls
  staffAPI = `https://${this.domain}:${this.port}/api/Staff`;
  // data to send
  postData = {
    test: 'content here'
  };

  constructor(private http: HttpClient) { }

  getStaffs(): Observable<Staff[]> {
    return this.http.get<Staff[]>(this.staffAPI);
  }

  postStaff(s: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.staffAPI, s);
  }
  updateStaff() {}
  deleteStaff() {}
  searchStaff() {}
}
