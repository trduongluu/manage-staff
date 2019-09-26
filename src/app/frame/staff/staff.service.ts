import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { staff } from './staff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  // api urls
  domain = 'localhost';
  port = '5001';
  getAPI: string = `https://${this.domain}:${this.port}/api/staff`;

  constructor(private http: HttpClient) { }

  getStaffs(): Observable<staff[]> {
    return this.http.get<staff[]>(this.getAPI);
  }

  addNewStaff() {}
  updateStaff() {}
  deleteStaff() {}
  searchStaff() {}
}
