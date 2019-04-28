export interface MetaData {
  id: string;
  description: string;
  parent: string;
}

export interface DepartmentData {
  id: string;
  name: string;
  location_id: number;
}

export interface CategoryData {
  id: string;
  name: string;
  department_id: number;
}

export interface SubCategoryData {
  id: string;
  name: string;
  category_id: number;
}

export interface SkuData {
  id: string;
  name: string;
  location_id: number;
  department_id: number;
  category_id: number;
  subcategory_id: number;
}