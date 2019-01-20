import { Injectable } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import {Department} from '../../../models/department.model';

@Injectable()
export class DepartmentService {

  constructor(private httpClient: HttpClient) { }

  baseUrl = 'http://localhost:3000/departments';

  getDepartments(): Observable<Department[]> {
    // @ts-ignore
    return this.httpClient.get<Department[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return new ErrorObservable();
  }

  getDepartment(id: number): Observable<Department> {
    // @ts-ignore
    return this.httpClient.get<Department>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addDepartment(department: Department): Observable<Department> {
    // @ts-ignore
    return this.httpClient.post<Department>(this.baseUrl, department, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  updateDepartment(department: Department): Observable<void> {
    // @ts-ignore
    return this.httpClient.put<void>(`${this.baseUrl}/${department.id}`, department, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError));
  }

  deleteDepartment(id: number): Observable<void> {
    // @ts-ignore
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

}
