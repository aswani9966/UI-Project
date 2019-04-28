import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData } from '../../models/metadata';
import {GridOptions} from "ag-grid";
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  gridOptions: GridOptions;
  columnDefs: any[]
  rowData: any[];
   private rowSelection;
  private gridApi;
  private gridColumnApi;
  constructor(private metaDataInfoService: MetaDataInfoService, private router: Router, private modalService: ModalService) { }
  locationName:any="";
  locationId:any="";
  gridDisplay:any=true;
  ngOnInit() {
  this.rowSelection='single';
    this.columnDefs = [
	{headerName: "Location Id", field: "id"},
	{headerName: "Location Name", field: "description", editable: true}
	];

  console.log("location component init");
  	this.metaDataInfoService.getAllLocations().subscribe(
        data => {
          this.rowData=data;
        });
    /*this.gridOptions.defaultColDef = {
      editable: true
    }*/
    //this.rowSelection = "multiple";
    
  }

  onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }
  
 /*createNewRowData() {
    var newData = {
      id: this.gridApi.getDisplayedRowCount()+1,
      description: "",
      parent: ""
    };
    return newData;
  }
  onAddRow() {
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
  }*/
  
  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
    this.metaDataInfoService.deleteLocation(id).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }
  
  /*onCellValueChanged(event){
    console.log(event);
    this.metaDataInfoService.updateLocation(event.data.id,event.data.description).subscribe(
        data => {
          console.log(data);
          console.log("deleted");
        });
  }*/
    
    openModal(id: string) {    
      this.locationName='';
      this.gridDisplay=false;
      this.modalService.open(id);
    }

    closeModal(id: string) {
      this.gridDisplay=true;
        this.modalService.close(id);
    }
    locationedit(event,id: string){
      this.locationName=event.data.description;
      this.locationId=event.data.id;
      
    }
    saveNewLocation(id: string){
    if(typeof(this.locationId)=="undefined" || this.locationId==""){
      this.locationId=this.gridApi.getDisplayedRowCount()+1;
    }
      this.metaDataInfoService.updateLocation(this.locationId,this.locationName).subscribe(
        data => {
          console.log(data);
          this.metaDataInfoService.getAllLocations().subscribe(
            data => {
              this.rowData=data;
              this.gridDisplay=true;
              this.modalService.close(id);
            });
        });
    }
    
   
  gotoMetaData(){
    this.router.navigate(['/meta-data']);
  }





}
