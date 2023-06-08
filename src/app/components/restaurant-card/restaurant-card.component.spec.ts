import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestaurantCardComponent } from './restaurant-card.component';

describe('RestaurantCardComponent', () => {
  let component: RestaurantCardComponent;
  let fixture: ComponentFixture<RestaurantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the restaurant name', () => {
    const restaurantName = 'Test Restaurant';
    component.restaurant = { name: restaurantName, imageUrl: '', rating: 0, cuisineTypes: [] };
    fixture.detectChanges();

    const nameElement: HTMLElement = fixture.nativeElement.querySelector('.card__details-restaurant-name');
    expect(nameElement.textContent).toContain(restaurantName);
  });

  it('should display the restaurant rating', () => {
    const restaurantRating = 4.5;
    component.restaurant = { name: '', imageUrl: '', rating: restaurantRating, cuisineTypes: [] };
    fixture.detectChanges();

    const ratingElement: HTMLElement = fixture.nativeElement.querySelector('.card__details-rating');
    expect(ratingElement.textContent).toContain(restaurantRating + ' / 5');
  });

  it('should display the cuisine types', () => {
    const cuisineTypes = ['Italian', 'Mexican', 'Chinese'];
    component.restaurant = { name: '', imageUrl: '', rating: 0, cuisineTypes };
    fixture.detectChanges();

    const cuisineElements: NodeListOf<Element> = fixture.nativeElement.querySelectorAll('.card__details-cuisine-types li');
    expect(cuisineElements.length).toEqual(cuisineTypes.length);

    cuisineElements.forEach((element, index) => {
      expect(element.textContent).toContain(cuisineTypes[index]);
    });
  });

});
