import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData,SkuData } from '../../models/metadata';
import {GridOptions} from "ag-grid";
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.css']
})
export class SkuComponent implements OnInit {

  constructor(private metaDataInfoService: MetaDataInfoService,private modalService: ModalService,private router: Router) { }
  	gridOptions: GridOptions;
  	columnDefs: any[]
  	rowData: any[];
  	locationsData: any[];
    departmentsData: any[];
    categoriesData: any[];
    subCategoriesData: any[];
   	private rowSelection;
  	private gridApi;
  	private gridColumnApi;
  	gridDisplay:any=true;
	 skuName:any="";
    skuId:any="";
    selectedLocationValue:any="";
    selectedDepartmentValue:any="";
    selectedCategoryValue:any="";
    selectedSubCategoryValue:any="";

    skuData:SkuData=<SkuData>{};
  ngOnInit() {
  this.rowSelection='single';
        this.columnDefs = [
	       {headerName: "Id", field: "id"},
	       {headerName: "SKU", field: "name"},
	       {headerName: "Location", field: "locationName"},
         {headerName: "Department", field: "departmentName"},
         {headerName: "Category", field: "categoryName"},
         {headerName: "Sub Category", field: "subcategoryName"}
	     ];

  	this.metaDataInfoService.getAllSkus().subscribe(
        data => {
          this.rowData=data;
        });
    this.metaDataInfoService.getAllCategories().subscribe(
        data => {
          this.categoriesData=data;
        });
        this.metaDataInfoService.getAllLocations().subscribe(
          data => {
            this.locationsData=data;
        });
        this.metaDataInfoService.getAllDepartments().subscribe(
        data => {
          this.departmentsData=data;
        });
        this.metaDataInfoService.getAllSubCategories().subscribe(
        data => {
          this.subCategoriesData=data;
        });        
        
  }
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    this.metaDataInfoService.deleteSku(id).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }
  
  openModal(id: string) {    
      this.skuName='';
      this.selectedCategoryValue='';
      this.selectedLocationValue = '';
      this.selectedDepartmentValue='';
      this.selectedSubCategoryValue='';
      //this.skuId='';
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
      this.skuName=event.data.name;
      this.skuId=event.data.id;
      for(let categoryinfo of this.categoriesData){
        if(event.data.categoryName === categoryinfo.description){
          this.selectedCategoryValue=categoryinfo.id;
        }
      }
      for(let locationinfo of this.locationsData){
        if(event.data.locationName === locationinfo.description){
          this.selectedLocationValue=locationinfo.id;
        }
      }
      for(let departmentinfo of this.departmentsData){
        if(event.data.departmentName === departmentinfo.description){
          this.selectedDepartmentValue=departmentinfo.id;
        }
      }
      for(let subcategoryinfo of this.subCategoriesData){
        if(event.data.subcategoryName === subcategoryinfo.description){
          this.selectedSubCategoryValue=subcategoryinfo.id;
        }
      }
      this.gridDisplay=false;
      this.modalService.open(id);
    }

    saveNewCategory(id: string){
      this.skuData.id=this.skuId;
      this.skuData.name=this.skuName
      this.skuData.category_id=this.selectedCategoryValue;
      this.skuData.location_id=this.selectedLocationValue;
      this.skuData.department_id=this.selectedDepartmentValue;
      this.skuData.subcategory_id=this.selectedSubCategoryValue;
      this.metaDataInfoService.saveSku(this.skuData).subscribe(
          data => {
            console.log(data);
            this.metaDataInfoService.getAllSkus().subscribe(
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
