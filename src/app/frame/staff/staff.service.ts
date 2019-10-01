import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Staff } from './staff';
import { Observable, of, pipe } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  domain = 'localhost';
  port = '5001';
  // api urls
  url = `https://${this.domain}:${this.port}`;
  staffAPI = `${this.url}/api/Staff`;
  // data to send
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getStaffs(index: number, size: number): Observable<any> {
    const api = `${this.staffAPI}?index=${index}&size=${size}`;

    return this.http.get<any>(api).pipe(
      tap(_ => console.log('fetched staffs')),
      catchError(this.handleError<Staff[]>('getStaffs', []))
    );
  }

  getStaffById(id: number): Observable<Staff> {
    const api = `${this.url}/getbyid/${id}`;
    return this.http.get<Staff>(api).pipe(
      tap(_ => console.log(`fetched staff id=${id}`)),
      catchError(this.handleError<Staff>(`getStaff id=${id}`))
    );
  }

  postStaff(s: Staff): Observable<Staff> {
    return this.http.post<Staff>(this.staffAPI, s, this.httpOptions).pipe(
      tap((s: Staff) => console.log(`added staff w/ sId=${s.staffId}`)),
      catchError(this.handleError<Staff>('postStaff'))
    );
  }
  updateStaff(s: Staff): Observable<Staff> {
    return this.http.put<Staff>(this.staffAPI, s, this.httpOptions).pipe(
      tap(_ => console.log(`updated staff sId=${s.staffId}`)),
      catchError(this.handleError<any>('updateStaff'))
    );
  }
  deleteStaff(sId: string): Observable<Staff> {
    const del = `${this.staffAPI}/delete/?sId=${sId}`;
    return this.http.delete<Staff>(del, this.httpOptions).pipe(
      tap(_ => console.log(`deleted staff id=${sId}`)),
      catchError(this.handleError<Staff>('deleteStaff'))
    );
  }
  searchStaff(index: number, size: number, searchKey: string): Observable<any> {
    const api = `${this.staffAPI}/search?index=${index}&size=${size}&searchString=${searchKey}`;

    return this.http.get<any>(api).pipe(
      tap(_ => console.log('searched staffs')),
      catchError(this.handleError<Staff[]>('searchStaff', []))
    );
  }
}
