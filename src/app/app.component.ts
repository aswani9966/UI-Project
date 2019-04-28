import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  data: any[];
  selectedNode: any;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
    console.log(event);
    });
  }
  ngOnInit() {
    /*this.metaDataInfoService.getAllMetaDataInfo().subscribe(
        data => {
          this.data=data;
        });*/
  }
  /*nodeUpdated(node:any){
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
  }*/
  gotoLogin(){
    this.router.navigate(['/login']);
  }
}
