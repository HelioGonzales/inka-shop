import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@inka-shop/products';
import { UiModule } from '@inka-shop/ui';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OrdersModule } from '@inka-shop/orders';
import { JwtInterceptor, UsersModule } from '@inka-shop/users';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ProductsModule,
    UiModule,
    OrdersModule,
    UsersModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
