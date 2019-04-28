import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData,SubCategoryData } from '../../models/metadata';
import {GridOptions} from "ag-grid";
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {

  constructor(private metaDataInfoService: MetaDataInfoService,private modalService: ModalService,private router: Router) { }
  	gridOptions: GridOptions;
  	columnDefs: any[]
  	rowData: any[];
  	categoriesData: any[];
   	private rowSelection;
  	private gridApi;
  	private gridColumnApi;
  	gridDisplay:any=true;
	 subCategoryName:any="";
    subCategoryId:any="";
    selectedCategoryValue:any="";
    subCategoryData:SubCategoryData=<SubCategoryData>{};
  ngOnInit() {
  	this.rowSelection='single';
        this.columnDefs = [
	       {headerName: "Id", field: "id"},
	       {headerName: "Sub Category", field: "description"},
	       {headerName: "Category", field: "parent"}
	     ];

  	this.metaDataInfoService.getAllSubCategories().subscribe(
        data => {
          this.rowData=data;
        });
    this.metaDataInfoService.getAllCategories().subscribe(
        data => {
          this.categoriesData=data;
        });
  }
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    this.metaDataInfoService.deleteSubCategory(id).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }
  
  openModal(id: string) {    
      this.subCategoryName='';
      this.selectedCategoryValue='';
      this.subCategoryId='';
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
    subCategoryEdit(event,id: string){
      this.subCategoryName=event.data.description;
      this.subCategoryId=event.data.id;
      for(let categoryinfo of this.categoriesData){
      if(event.data.parent === categoryinfo.description){
        this.selectedCategoryValue=categoryinfo.id;
          //console.log(categoryinfo);
        this.gridDisplay=false;
        this.modalService.open(id);
      }
      }
      //console.log(event);

    }
    saveNewCategory(id: string){
      this.subCategoryData.id=this.subCategoryId;
      this.subCategoryData.name=this.subCategoryName
      this.subCategoryData.category_id=this.selectedCategoryValue;
      this.metaDataInfoService.saveSubCategory(this.subCategoryData).subscribe(
          data => {
            console.log(data);
            console.log("inserted/updated");
                this.metaDataInfoService.getAllSubCategories().subscribe(
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
