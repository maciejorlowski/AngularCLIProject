import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Department} from '../../models/department.model';
import {Employee} from '../../models/employee.model';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {EmployeeService} from '../service/employee/employee.service';
import {Router, ActivatedRoute} from '@angular/router';
import {DepartmentService} from '../service/department/depatrment-.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string;
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;
  selectedFile = null;

  departments: Department[] | string = this._route.snapshot.data['departmentList'];

  constructor(private _employeeService: EmployeeService,
              private _departmentService: DepartmentService,
              private _router: Router,
              private _route: ActivatedRoute,
  private httpClient: HttpClient) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
    // this.departments = _departmentService.getDepartments();
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }



  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getEmployee(id);
    });
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
      };
      this.panelTitle = 'Create Employee';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Edit Employee';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }

  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload(){
    const fd = new FormData()
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.httpClient.post('http://localhost:4200/assets/', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

}
