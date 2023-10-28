import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allProducts: any = null;
  numOfCartItems: number = 0;
  totalCartPrice: number = 0;
  isLoading = false;
  constructor(private _CartService: CartService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.isLoading = true;
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        if (response.status == "success") {
          this.isLoading = false;
          this.changeData(response)
        }
      },
      error: () => {
        this.isLoading = false;
      }
    })
  }

  removerSpecificItem(id: string) {
    this._CartService.removeSpecificItem(id).subscribe({
      next: (response) => {
        if (response.status == "success") {
          this.changeData(response)
          this.toastr.success('', 'Product Is Removed', {
            closeButton: true,
            positionClass: 'toast-bottom-right'
          });
        }
      },
      error: (err) => {
        this.toastr.error('', 'Sorry, Try Again', {
          positionClass: 'toast-bottom-right'
        });
      }
    })
  }

  changeData(response: any) {
    this.allProducts = response.data.products;
    this.numOfCartItems = response.numOfCartItems;
    this._CartService.numOfProducts.next(this.numOfCartItems);
    this.totalCartPrice = response.data.totalCartPrice;
  }

  updateItemQuantity(id: string, count: number) {
    if (count === 0) {
      this.toastr.error('', 'Sorry Minimum Quntity Of Product Is One', {
        positionClass: 'toast-bottom-right'
      });
    } else {
      this._CartService.updateItemQuantity(id, count).subscribe({
        next: (response) => {
          this.changeData(response)
        }
      })
    }
  }
  clearUserCart() {
    this._CartService.clearUserCart().subscribe({
      next: (response) => {
        if (response.message == "success") {
          this.allProducts = null;
          this.numOfCartItems = 0;
          this._CartService.numOfProducts.next(0);
          this.totalCartPrice = 0;
        }
      }
    })
  }
}
