import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface staff {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  // getStaff() {
  //   return this.http.get('url');
  // }

  getStaffs(): staff[] {
    const staffs: staff[] = [
      { id: 'E001', name: 'Duong', email: 'dualeo@gmail.com', phone: '078951995', address: '20 Le Dai Hanh Str' },
      { id: 'E002', name: 'Cam', email: 'camnguyen@gmail.com', phone: '055996799', address: '33 Kim Ma Str' },
      { id: 'E003', name: 'Thai', email: 'thainguyen@gmail.com', phone: '066214697', address: '87 Hoang Cau Str' },
      { id: 'E004', name: 'Hai', email: 'haibeo@gmail.com', phone: '0785529332', address: '73 Truong Chinh Str' },
      { id: 'E005', name: 'Duc', email: 'duc@gmail.com', phone: '0369525886', address: '45 Xa Dan Str' },
      { id: 'E006', name: 'Manh', email: 'manh@gmail.com', phone: '5579922665', address: '10 Xa Dan Str' },
      { id: 'E007', name: 'Tuan', email: 'tuan@gmail.com', phone: '0155579527', address: '10 Pham Ngoc Thach Str' },
      { id: 'E008', name: 'Manh', email: 'manh@gmail.com', phone: '5579922665', address: '19 Hoa Ma Str' },
      { id: 'E009', name: 'Phuong', email: 'manh@gmail.com', phone: '5579922665', address: '11 Lo Duc Str' },
    ];
    return staffs;
  };
}
