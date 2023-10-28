import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { ProductService } from 'src/app/Services/product.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000, // Auto-play interval in milliseconds (3 seconds)
    autoplayHoverPause: true,
    animateOut: 'fadeOut', // Animation for item out
    animateIn: 'fadeIn',
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  products: any = [];
  searchTerm: string = '';
  constructor(private _ProductService: ProductService, private _Router: Router, private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._ProductService.getAllProducts(1).subscribe({
      next: (respons) => {
        this.isLoading = false
        this.products = respons.data;
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
