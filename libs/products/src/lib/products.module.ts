import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'category/:id',
    component: ProductsListComponent,
  },
  {
    path: 'products/:id',
    component: ProductPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  exports: [
    ProductsSearchComponent,
    CategoriesBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
})
export class ProductsModule {}
