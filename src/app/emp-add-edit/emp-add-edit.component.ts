import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Graduate',
    'Diploma',
    'Bachelor',
    'Master',
    'PhD'
  ]

  constructor(
    private _fb:FormBuilder,
    private _empservie:EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, // for update
    private _coreService: CoreService
    ){
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    })
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empservie
        .updateEmployee(this.data.id, this.empForm.value)
        .subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Employee updated successfully');
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.log(err);
          }
        })
      }
      else{
        this._empservie
        .addEmployee(this.empForm.value)
        .subscribe({
          next: (val: any) =>{
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err : any) => {
            console.log(err);
          }
        })
      }
    }
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

}
