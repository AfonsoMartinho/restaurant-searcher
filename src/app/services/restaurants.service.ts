import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  getRestaurantsData(postCode: string, page: number, itemsPerPage = 18): Observable<any>{
    return this.http.get<any>(`/api/restaurants/bypostcode/${postCode}`, {
      headers: new HttpHeaders()
        .set( 'Content-Type', 'application/json'),
    })
    .pipe(map(data => {
      const openRestaurants = data.Restaurants.map((restaurant: any) => {
        if (restaurant.IsOpenNow) {
          return {
            name: restaurant.Name,
            rating : restaurant.RatingAverage,
            imageUrl: restaurant.LogoUrl,
            cuisineTypes: Object.values({...restaurant.CuisineTypes.map((type: any) => type.Name)}),
          }
        } return {}
      });
      // handling pagination
      // TODO pass this logic to the component
      return openRestaurants.splice((page*itemsPerPage) - itemsPerPage, itemsPerPage )
    }))
  }
}