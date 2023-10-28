import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  isLoading = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000, // Auto-play interval in milliseconds (3 seconds)
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
  product: any = null;
  id: any = "";
  constructor(private _ProductService: ProductService, private _ActivatedRoute: ActivatedRoute, private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params?.get('id');
      }
    })
    this._ProductService.getProductDetails(this.id).subscribe({
      next: (respons) => {
        this.isLoading = false;
        this.product = respons;
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
}
