import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Slide } from '../model/slide';
import { Constants } from 'src/app/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  slideUrl = Constants.SLIDE_URL;

  constructor(private http: HttpClient) { }

  getSlides(): Observable<Slide[]> {
    return this.http.get<Slide[]>(this.slideUrl).pipe(
      catchError(this.handleError('getSlides', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Service Response */
  private log(message: string) {
    console.log('Service Response::' + message);
  }

}
