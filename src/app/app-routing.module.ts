import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { MetaDataComponent } from './components/meta-data/meta-data.component';
import { LocationsComponent } from './components/locations/locations.component';
import { DepartmentComponent } from './components/department/department.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { SubcategoryComponent } from './components/subcategory/subcategory.component';
import { SkuComponent } from './components/sku/sku.component';
import { SkuDataComponent } from './components/sku-data/sku-data.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 { path: 'meta-data', component: MetaDataComponent },
 { path: 'locations', component: LocationsComponent },
 { path: 'department', component: DepartmentComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'subcategories', component: SubcategoryComponent },
  { path: 'sku', component: SkuComponent },
  { path: 'sku-data', component: SkuDataComponent },
  { path: 'admin', component: AdminPageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
