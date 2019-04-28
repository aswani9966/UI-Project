import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData,CategoryData } from '../../models/metadata';
import {GridOptions} from "ag-grid";
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private metaDataInfoService: MetaDataInfoService,private modalService: ModalService,private router: Router) { }
	gridOptions: GridOptions;
  	columnDefs: any[]
  	rowData: any[];
  	departmentsData: any[];
   	private rowSelection;
  	private gridApi;
  	private gridColumnApi;
  	gridDisplay:any=true;
	categoryName:any="";
    categoryId:any="";
    selectedDepartmentValue:any="";
    categoryData:CategoryData=<CategoryData>{};
  ngOnInit() {
  	this.rowSelection='single';
        this.columnDefs = [
	       {headerName: "Id", field: "id"},
	       {headerName: "Category", field: "description"},
	       {headerName: "Department", field: "parent"}
	     ];

  	this.metaDataInfoService.getAllCategories().subscribe(
        data => {
          this.rowData=data;
        });
    this.metaDataInfoService.getAllDepartments().subscribe(
        data => {
          this.departmentsData=data;
        });
  }
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    this.metaDataInfoService.deleteCategory(id).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }
  
  openModal(id: string) {    
      this.categoryName='';
      this.selectedDepartmentValue='';
      this.categoryId='';
  		this.gridDisplay=false;
      this.modalService.open(id);
    }

    closeModal(id: string) {
    	this.gridDisplay=true;
        this.modalService.close(id);
    }
    onGridReady(params){
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }
    categoryedit(event,id: string){
      this.categoryName=event.data.description;
      this.categoryId=event.data.id;
      for(let departmentinfo of this.departmentsData){
      if(event.data.parent === departmentinfo.description){
        this.selectedDepartmentValue=departmentinfo.id;
          //console.log(departmentinfo);
        this.gridDisplay=false;
        this.modalService.open(id);
      }
      }
      //console.log(event);

    }
    saveNewCategory(id: string){
      this.categoryData.id=this.categoryId;
      this.categoryData.name=this.categoryName
      this.categoryData.department_id=this.selectedDepartmentValue;
      this.metaDataInfoService.saveCategory(this.categoryData).subscribe(
          data => {
            console.log(data);
                this.metaDataInfoService.getAllCategories().subscribe(
                  data => {
                    this.rowData=data;
                  });
            this.gridDisplay=true;
          this.modalService.close(id);
          });;
    }
    gotoMetaData(){
    this.router.navigate(['/meta-data']);
  }
}
