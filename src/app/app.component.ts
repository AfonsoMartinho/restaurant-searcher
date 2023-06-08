import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { RestaurantsService } from './services/restaurants.service'
import { IRestaurant } from './models/restaurant.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private restaurantsService: RestaurantsService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  postCode: string = "";
  currentPage: number = 0;
  itemsPerPage: number = 15;
  restaurantsData: IRestaurant[] = [];
  displayedRestaurants: IRestaurant[] = [];
  errorMessage: string = "";
  isLoading: boolean = false;
  totalPages: number = 0;

  ngOnInit(): void {}

  @HostListener('document:keyup.enter')
  onSubmit() {
    if(this.validatePostCode()) {
      this.getRestaurantsData(this.postCode);
      this.errorMessage = '';
    }
    else {
      this.errorMessage = 'Please Provide a valid post code'
      this.restaurantsData = []
      this.updateDisplayedRestaurants()
    }
  }

  getRestaurantsData(postCode: string) {
    this.isLoading = true;
    this.restaurantsData = [];
    this.currentPage = 1;

    this.restaurantsService.getOpenRestaurantsData(postCode)
      .subscribe({
        next: (response: IRestaurant[]) => {
          this.restaurantsData = response;
          this.changeDetectorRef.detectChanges();
          this.updateDisplayedRestaurants();
        },
        error: (error: any) => {
          console.log(error);
          this.errorMessage = "An error occurred while fetching restaurants data.";
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  updateDisplayedRestaurants() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.totalPages = Math.ceil(this.restaurantsData.length / this.itemsPerPage);
    this.displayedRestaurants = this.restaurantsData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updateDisplayedRestaurants();
  }

  validatePostCode() {
    if (!this.postCode) return false;
    const parsedPostcode = this.postCode.replace(/\s/g, "");
    const regex = /^(GIR 0AA|[A-PR-UWYZ](?:\d{0,2}|[A-HK-Y]\d{0,1}|[A-HK-Y]\d[A-Z])?)(\s?\d[A-HJKPS-UW]?[A-HJKPS-UW-Z]{2})?$/i;
    return regex.test(parsedPostcode);
  }
}
