import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';



import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Booking, OfferItem } from './booking';


@Injectable({
  providedIn: 'root'
})

export class BookingService {

  private bookingUrl = 'http://127.0.0.1:5002/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {  }


  getEstimate(params : string): Observable<OfferItem> {

    const url = `${this.bookingUrl}/?name=${params}`;
    console.log('dans le return');
    return this.http.get<OfferItem>(this.bookingUrl)

  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: OfferItem): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.available}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
  
 

