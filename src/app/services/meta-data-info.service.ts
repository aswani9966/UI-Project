import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { MetaData,DepartmentData,SubCategoryData } from '../models/metadata';

@Injectable({
  providedIn: 'root'
})
export class MetaDataInfoService {

  constructor(private http: HttpClient) { }

  getAllMetaDataInfo() {
    const url = 'http://localhost:8080/api/v1/metaData';
    return this.http.get<MetaData[]>(url);
  }
   getAllSkuDataInfo() {
    const url = 'http://localhost:8080/api/v1/skuData';
    return this.http.get<MetaData[]>(url);
  }
  
  getAllLocations() {
    const url = 'http://localhost:8080/api/v1/locations';
    return this.http.get<MetaData[]>(url);
  }
  updateLocation(id,name){
  var data = {'id':id,'description':name};
  	const url = 'http://localhost:8080/api/v1/updateLocation/'+id+'/'+name;
    return this.http.put<MetaData[]>(url,data);
  }
  deleteLocation(id){
  	const url = 'http://localhost:8080/api/v1/deleteLocation/'+id;
    return this.http.delete(url);
  }

  getAllDepartments() {
    const url = 'http://localhost:8080/api/v1/departments';
    return this.http.get<MetaData[]>(url);
  }
  saveDepartment(data){
  //var data = {'id':id,'description':name};
    const url = 'http://localhost:8080/api/v1/saveDepartment';
    return this.http.post<DepartmentData[]>(url,data);
  }
  deleteDepartment(id){
    const url = 'http://localhost:8080/api/v1/deleteDepartment/'+id;
    return this.http.delete(url);
  }

  getAllCategories() {
    const url = 'http://localhost:8080/api/v1/getcategories';
    return this.http.get<MetaData[]>(url);
  }
  saveCategory(data){
    const url = 'http://localhost:8080/api/v1/saveCategory';
    return this.http.post<DepartmentData[]>(url,data);
  }
  deleteCategory(id){
    const url = 'http://localhost:8080/api/v1/deleteCategory/'+id;
    return this.http.delete(url);
  }

  getAllSubCategories() {
    const url = 'http://localhost:8080/api/v1/getSubCategories';
    return this.http.get<MetaData[]>(url);
  }
  saveSubCategory(data){
    const url = 'http://localhost:8080/api/v1/saveSubCategory';
    return this.http.post<SubCategoryData[]>(url,data);
  }
  deleteSubCategory(id){
    const url = 'http://localhost:8080/api/v1/deleteSubCategory/'+id;
    return this.http.delete(url);
  }

  getAllSkus() {
    const url = 'http://localhost:8080/api/v1/getSkus';
    return this.http.get<MetaData[]>(url);
  }
  saveSku(data){
    const url = 'http://localhost:8080/api/v1/saveSku';
    return this.http.post<SubCategoryData[]>(url,data);
  }
  deleteSku(id){
    const url = 'http://localhost:8080/api/v1/deleteSku/'+id;
    return this.http.delete(url);
  }

  processSKUData() {
    const url = 'http://localhost:8080/api/v1/processSKU';
    return this.http.get<MetaData[]>(url);
  }
  processMetaData() {
    const url = 'http://localhost:8080/api/v1/processMetaData';
    return this.http.get<MetaData[]>(url);
  }

}
