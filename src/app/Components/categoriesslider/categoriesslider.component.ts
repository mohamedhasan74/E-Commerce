import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-categoriesslider',
  templateUrl: './categoriesslider.component.html',
  styleUrls: ['./categoriesslider.component.css']
})
export class CategoriessliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
  categories: any = null;
  constructor(private _ProductService: ProductService) { }
  ngOnInit(): void {
    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response?.data
      }
    })
  }

}
