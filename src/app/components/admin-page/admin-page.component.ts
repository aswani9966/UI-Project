import { Component, OnInit } from '@angular/core';
import { MetaDataInfoService } from '../../services/meta-data-info.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private metaDataInfoService: MetaDataInfoService) { }
	resData: any[];
  ngOnInit() {
  }
  processMeta(){
  	this.metaDataInfoService.processMetaData().subscribe(
        data => {
          this.resData=data;
        });
  }
  processSKU(){
  	this.metaDataInfoService.processSKUData().subscribe(
        data => {
          this.resData=data;
        });
  }
}
