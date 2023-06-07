import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  constructor(private http: HttpClient) { }

  getRestaurantsData(postCode: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/restaurants/bypostcode/${postCode}`, {
      headers: new HttpHeaders()
        .set( 'Content-Type', 'application/json'),
    });
  }
}