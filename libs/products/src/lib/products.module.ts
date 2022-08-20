import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent],
})
export class ProductsModule {}
