import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service'
import { IRestaurant } from './models/restaurant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService) {

  }
  postCode: string = "ec4m";
  currentPage: number = 1;

  restaurantsData?: IRestaurant[]

  ngOnInit(): void {
    this.getRestaurantsData(this.postCode, this.currentPage);
  }
  onSubmit() {
    this.getRestaurantsData(this.postCode, this.currentPage);
    this.postCode = "";
  }

  private getRestaurantsData(postCode: string, currentPage:number) {
    this.restaurantsService.getRestaurantsData(postCode, currentPage)
    .subscribe({
      next: (response: IRestaurant[]) => {
        this.restaurantsData = response;
        console.log(response);
      }
    });
  }
}
