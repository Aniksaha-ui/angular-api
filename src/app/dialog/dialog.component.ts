import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    personForm !: FormGroup

  constructor(private formBuilder: FormBuilder,private api: ApiService, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      firstName : ['',Validators.required],
      lastName: ['',Validators.required],
      address: ['',Validators.required]
    })
  }

  addProduct(){
      if(this.personForm.valid){
        this.api.postUser(this.personForm.value)
        .subscribe({
          next:(res)=>{
            alert("Product added successfully");
            this.personForm.reset();
            this.dialogRef.close('save');

          },
          error:()=>{
            alert("product not inserted")
          }
        })
      }
  }



}
