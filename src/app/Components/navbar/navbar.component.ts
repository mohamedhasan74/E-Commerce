import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged: Boolean = false;
  userName: string = "";
  numberOfProducts: number = 0;
  constructor(private _AuthService: AuthService, private _CartService: CartService) { }
  ngOnInit(): void {
    this._AuthService.isLogged.subscribe((reponse) => {
      if (reponse) {
        this.isLogged = true;
        this.userName = reponse.name;
      } else {
        this.isLogged = false
      }
    })
    this._CartService.numOfProducts.subscribe({
      next: (number) => {
        this.numberOfProducts = number;
      }
    })
  }
  logOut() {
    this._AuthService.logOut();
  }
}
