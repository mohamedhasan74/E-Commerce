import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductComponent } from './Components/product/product.component';
import { BrandComponent } from './Components/brand/brand.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriessliderComponent } from './Components/categoriesslider/categoriesslider.component';
import { ToastrModule } from 'ngx-toastr';
import { SearchPipe } from './Pipes/search.pipe';
import { LoaderComponent } from './Components/loader/loader.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { VerifyresetpasswordComponent } from './Components/verifyresetpassword/verifyresetpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductComponent,
    BrandComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    ProductdetailsComponent,
    NavbarComponent,
    NotfoundComponent,
    CategoriessliderComponent,
    SearchPipe,
    LoaderComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    VerifyresetpasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
