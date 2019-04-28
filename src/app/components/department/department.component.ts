import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData,DepartmentData } from '../../models/metadata';
import {GridOptions} from "ag-grid";
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
	constructor(private metaDataInfoService: MetaDataInfoService,private modalService: ModalService,private router: Router) { }
	  gridOptions: GridOptions;
  	columnDefs: any[]
  	rowData: any[];
  	locationsData: any[];
   	private rowSelection;
  	private gridApi;
  	private gridColumnApi;
  	gridDisplay:any=true;
	  departmentName:any="";
    departmentId:any="";
    selectedLocationValue:any="";
    departmentData:DepartmentData=<DepartmentData>{};
    ngOnInit() {
  	   this.rowSelection='single';
        this.columnDefs = [
	       {headerName: "Id", field: "id"},
	       {headerName: "Department", field: "description"},
	       {headerName: "Location", field: "parent"}
	     ];

  	this.metaDataInfoService.getAllDepartments().subscribe(
        data => {
          this.rowData=data;
        });
    this.metaDataInfoService.getAllLocations().subscribe(
        data => {
          this.locationsData=data;
        });
  }
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    this.metaDataInfoService.deleteDepartment(id).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }
  
  openModal(id: string) {    
      this.departmentName='';
      this.selectedLocationValue='';
      this.departmentId='';
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
    departmentedit(event,id: string){
      this.departmentName=event.data.description;
      this.departmentId=event.data.id;
      for(let locationinfo of this.locationsData){
      if(event.data.parent === locationinfo.description){
        this.selectedLocationValue=locationinfo.id;
          //console.log(locationinfo);
        this.gridDisplay=false;
        this.modalService.open(id);
      }
      }
      //console.log(event);

    }
    saveNewDepartment(id: string){
      this.departmentData.id=this.departmentId;
      this.departmentData.name=this.departmentName
      this.departmentData.location_id=this.selectedLocationValue;
      //1+parseInt(this.selectedLocationValue.split(":")[0]);
      this.metaDataInfoService.saveDepartment(this.departmentData).subscribe(
          data => {
            console.log(data);
            console.log("inserted/updated");
                this.metaDataInfoService.getAllDepartments().subscribe(
                  data => {
                    this.rowData=data;
                  });
            this.gridDisplay=true;
          this.modalService.close(id);
          });;
      	//console.log(this.departmentName);
        //console.log(this.selectedLocationValue)
        //console.log(this.departmentData);
    }
    gotoMetaData(){
    this.router.navigate(['/meta-data']);
  }
}
