import { Component, OnInit } from '@angular/core';
import { AngularD3TreeLibService } from 'angular-d3-tree-lib';
import dataTreeSimple from '../../../assets/data-tree-simple';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { MetaData } from '../../models/metadata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meta-data',
  templateUrl: './meta-data.component.html',
  styleUrls: ['./meta-data.component.css']
})
export class MetaDataComponent implements OnInit {
	data: any[];
  selectedNode: any;
  constructor(private treeService: AngularD3TreeLibService,
  private metaDataInfoService: MetaDataInfoService,
  private router: Router) { }

  ngOnInit() {
  console.log("metadatacomponent init");
  	this.metaDataInfoService.getAllMetaDataInfo().subscribe(
        data => {
          this.data=data;
        });
  }
  nodeUpdated(node:any){
    console.info("app detected node change");
  }
  nodeSelected(node:any){
    console.info("app detected node selected", node);
    this.selectedNode= node;
  }

  addNode():void{
    const parent= this.selectedNode? this.selectedNode.id: "1";
    const name= window.prompt("new node name");
    this.treeService.addNode({id: "999", descripcion: name, parent: parent});
  }

  gotoLocations():void{
    this.router.navigate(['/locations']);
  }
  gotoDepartments(){
    this.router.navigate(['/department']);
  }
  gotoCategories(){
    this.router.navigate(['/categories']);
  }
  gotoSubCategories(){
    this.router.navigate(['/subcategories']); 
  }
  gotoSKU(){
    this.router.navigate(['/sku']); 
  }
  gotoSKUChart(){
    this.router.navigate(['/sku-data']); 
  }
}
