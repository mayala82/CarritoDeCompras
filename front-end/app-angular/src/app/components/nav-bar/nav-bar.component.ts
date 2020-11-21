import { Component, OnInit, Input } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  @Input() numRecordsInCart: number;

  currentId = localStorage.getItem('angCurrentUser');

  constructor(
      public router: Router,
      public authService: AuthService,
      public cartService: CartService) { }

  ngOnInit(): void {

  }

  showcart(): void {
     this.router.navigate(['/showcart']);
 }

}
