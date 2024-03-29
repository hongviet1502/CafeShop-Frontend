import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumn:string[] = ['name','edit']
  dataSource:any
  responseMessage:any

  constructor(private categoryService:CategoryService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router){}

  ngOnInit(): void {
      this.ngxService.start()
      this.tableData()
  }
  
  tableData(){
    this.categoryService.getCategory().subscribe((response:any)=>{
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response)
    },(error:any)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }
      else{
        this.responseMessage = GlobalConstants.genericError

      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalConstants.error)
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.toLowerCase()
  }

  handleAddCategoryAction(){

  }

  handleEditCategoryAction(value:any){
    
  }
}
