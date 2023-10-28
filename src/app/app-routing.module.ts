import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { BrandComponent } from './Components/brand/brand.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { authGuard } from './Guards/auth.guard';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { VerifyresetpasswordComponent } from './Components/verifyresetpassword/verifyresetpassword.component';

const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductComponent },
  { path: "productDetails/:id", component: ProductdetailsComponent },
  { path: "brands", component: BrandComponent, canActivate: [authGuard] },
  { path: "cart", component: CartComponent, canActivate: [authGuard] },
  { path: "resetpassword", component: ResetpasswordComponent },
  { path: "forgetpassword", component: ForgetpasswordComponent },
  { path: "verifyresetpassword", component: VerifyresetpasswordComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
