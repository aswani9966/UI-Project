import { Component, OnInit } from '@angular/core';
import { AngularD3TreeLibService } from 'angular-d3-tree-lib';
import dataTreeSimple from '../../../assets/data-tree-simple';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sku-data',
  templateUrl: './sku-data.component.html',
  styleUrls: ['./sku-data.component.css']
})
export class SkuDataComponent implements OnInit {
	data: any[];
  selectedNode: any;
  constructor(private treeService: AngularD3TreeLibService,
  private metaDataInfoService: MetaDataInfoService,
  private router: Router) { }

  ngOnInit() {
  	this.metaDataInfoService.getAllSkuDataInfo().subscribe(
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
  gotoMetaData(){
    this.router.navigate(['/meta-data']);
  }

}
