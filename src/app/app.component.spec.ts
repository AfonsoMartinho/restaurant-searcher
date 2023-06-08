import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RestaurantsService } from './services/restaurants.service';
import { of, throwError } from 'rxjs';
import { IRestaurant } from './models/restaurant.model';
import { FormsModule } from '@angular/forms';
import { RestaurantCardComponent } from './components/restaurant-card/restaurant-card.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let restaurantsService: RestaurantsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RestaurantCardComponent,
        EmptyStateComponent,
        PaginationComponent,
        LoaderComponent
      ],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [RestaurantsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    restaurantsService = TestBed.inject(RestaurantsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading state when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('.restaurants__loading');
    expect(loadingElement).toBeTruthy();
  });

  it('should display search results when displayedRestaurants has items', () => {
    const restaurants: IRestaurant[] = [
      { name: 'Restaurant 1', imageUrl: 'image1.jpg', rating: 4, cuisineTypes: ['Italian', 'Pizza'] },
      { name: 'Restaurant 2', imageUrl: 'image2.jpg', rating: 3.5, cuisineTypes: ['Mexican', 'Tacos'] }
    ];
    component.displayedRestaurants = restaurants;
    fixture.detectChanges();
    const restaurantCards = fixture.nativeElement.querySelectorAll('.restaurants__grid-card');
    expect(restaurantCards.length).toBe(restaurants.length);
  });

  it('should display empty state when restaurantsData is empty', () => {
    spyOn(restaurantsService, 'getOpenRestaurantsData').and.returnValue(of([]));
  
    component.postCode = 'EC4M';
    component.onSubmit();
    fixture.detectChanges();
  
    expect(component.isLoading).toBe(false);
    expect(component.restaurantsData).toEqual([]);
    expect(component.currentPage).toBe(1);
    expect(component.displayedRestaurants).toEqual([]);
    expect(component.errorMessage).toBe('');
    expect(fixture.nativeElement.querySelector('.restaurants__empty')).toBeTruthy();
  });

  it('should display error message when errorMessage is set', () => {
    const errorMessage = 'An error occurred.';
    component.errorMessage = errorMessage;
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.restaurants__error');
    expect(errorElement.textContent).toContain(errorMessage);
  });

  it('should call getRestaurantsData when onSubmit is triggered', () => {
    spyOn(component, 'getRestaurantsData');
    const postCode = 'EC4M';
    component.postCode = postCode;
    fixture.detectChanges();
    const searchButton = fixture.nativeElement.querySelector('.restaurants__search-button button');
    searchButton.click();
    expect(component.getRestaurantsData).toHaveBeenCalledWith(postCode);
  });

  it('should update currentPage and call updateDisplayedRestaurants when handlePageChange is called', () => {
    spyOn(component, 'updateDisplayedRestaurants');
    const pageNumber = 3;
    component.handlePageChange(pageNumber);
    expect(component.currentPage).toBe(pageNumber);
    expect(component.updateDisplayedRestaurants).toHaveBeenCalled();
  });

  it('should fetch and update restaurants data when getRestaurantsData is called', () => {
    const postCode = 'EC4M';
    const restaurants: IRestaurant[] = [
      {  name: 'Restaurant 1', imageUrl: 'image1.jpg', rating: 4, cuisineTypes: ['Italian', 'Pizza'] },
      { name: 'Restaurant 2', imageUrl: 'image2.jpg', rating: 3.5, cuisineTypes: ['Mexican', 'Tacos'] }
    ];
    spyOn(restaurantsService, 'getOpenRestaurantsData').and.returnValue(of(restaurants));
    component.getRestaurantsData(postCode);
    expect(component.restaurantsData).toEqual(restaurants);
    expect(component.isLoading).toBeFalse();
    expect(component.totalPages).toBe(Math.ceil(restaurants.length / component.itemsPerPage));
    expect(component.displayedRestaurants).toEqual(restaurants.slice(0, component.itemsPerPage));
  });
});
