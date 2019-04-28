import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularD3TreeLibModule } from 'angular-d3-tree-lib';
import { AppComponent } from './app.component';
import { MetaDataComponent } from './components/meta-data/meta-data.component';
import { AppRoutingModule } from './app-routing.module';
import { LocationsComponent } from './components/locations/locations.component';
import {AgGridModule} from "ag-grid-angular/main";
import { FormsModule }   from '@angular/forms';
import { DepartmentComponent } from './components/department/department.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { SkuComponent } from './components/sku/sku.component';
import { SkuDataComponent } from './components/sku-data/sku-data.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MetaDataComponent,
    LocationsComponent,
    DepartmentComponent,
    ModalComponent,
    LoginComponent,
    CategoryComponent,
    SubcategoryComponent,
    SkuComponent,
    SkuDataComponent,
    AdminPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularD3TreeLibModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    FormsModule
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
