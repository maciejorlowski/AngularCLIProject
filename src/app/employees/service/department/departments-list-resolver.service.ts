import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { Observable } from 'rxjs/Observable';
import { DepartmentService } from './depatrment-.service';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import {Department} from '../../../models/department.model';
import {HttpClientModule, HttpClient} from '@angular/common/http';



@Injectable()
export class DepartmentListResolverService implements Resolve<Department[] | string> {
  constructor(private _departmentService: DepartmentService) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Department[] | string> {
    return this._departmentService.getDepartments()
      .pipe(
        catchError((err: string) => Observable.of(err))
      );
  }
}
