import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  getOpenRestaurantsData(postCode: string): Observable<any>{
    return this.http.get<any>(`/api/restaurants/bypostcode/${postCode}`, {
      headers: new HttpHeaders()
        .set( 'Content-Type', 'application/json'),
    })
    .pipe(map(data => {
      const openRestaurants = data.Restaurants.filter((restaurant:any) => restaurant.IsOpenNow)
      console.log(openRestaurants);
      return openRestaurants.map((restaurant: any) => {
          return {
            name: restaurant.Name,
            rating : restaurant.RatingAverage,
            imageUrl: restaurant.LogoUrl,
            cuisineTypes: Object.values({...restaurant.CuisineTypes.map((type: any) => type.Name)}),
          }
      });
    }))
  }
}