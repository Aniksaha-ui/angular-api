import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['id','firstName', 'lastName', 'address'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api:ApiService) {}

  ngOnInit(){
      this.getUserInformation()
  }

  getUserInformation(){
    console.log("functionnnnnnnnnn");
   const data = this.api.getUser()
                .subscribe({
                  next:(res)=>{
                    // console.log(res)
                    this.dataSource =new MatTableDataSource(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    console.log(this.dataSource)
                  }
                })
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  openDialog() {
    this.dialog.open(DialogComponent, {});
  }



}
