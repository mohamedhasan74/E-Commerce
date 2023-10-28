import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  allProduct: any = [];
  isLoading = false;
  constructor(private _ProductService: ProductService, private _Router: Router, private toastr: ToastrService, private _CartService: CartService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllProducts(1).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.allProduct.push(...response?.data);
      }
    })
    this._ProductService.getAllProducts(2).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.allProduct?.push(...response.data);
      }
    })
  }
  addToCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (respons) => {
        if (respons.status == "success") {
          this._CartService.numOfProducts.next(respons.numOfCartItems);
          this.toastr.success('', 'Product Is Added To Cart', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
        }
      },
      error: (err) => {
        this.toastr.error('', 'Sorry Try Again, You Must Login First', {
          closeButton: true,
          positionClass: 'toast-bottom-right'
        });
      }
    })
  }
  getProductDetails(id: string) {
    this._Router.navigate(['/productDetails', id])
  }
}
