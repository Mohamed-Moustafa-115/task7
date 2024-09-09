import { Component } from '@angular/core';
import { BestSellersComponent } from "../best-sellers/best-sellers.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BestSellersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
