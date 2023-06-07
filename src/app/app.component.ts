import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private restaurantsService: RestaurantsService) {

  }
  postCode: string = "ec4m";

  restaurantsData?: any[]

  ngOnInit(): void {
    this.getRestaurantsData(this.postCode);
  }
  onSubmit() {
    this.getRestaurantsData(this.postCode);
    this.postCode = "";
  }

  private getRestaurantsData(postCode: string) {
    this.restaurantsService.getRestaurantsData(postCode)
    .subscribe({
      next: (response: any) => {
        this.restaurantsData = response;
        console.log(response);
      }
    });
  }
}
