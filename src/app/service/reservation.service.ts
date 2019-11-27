import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Reservation } from '../model/reservation';

@Injectable()
export class ReservationService {
    private basesUrl = 'http://localhost:3030/api-sg/v1/';

    constructor(private http: HttpClient){}

    private log(log: string){
		console.info(log);
	}
  
	private handleError<T>(operation='operation', result?: T){
		return (error: any): Observable<T> => {
		  console.log(`${operation} failed: ${error.message}`);
  
		  return of(result as T);
		}
    }
    
    getReservations(location : string): Observable<Reservation[]>{
		const url = `${this.basesUrl}openspace/reservation/${location}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.get<Reservation[]>(url,header)
			.pipe(
				tap(_ => this.log(`fetched Reservations`)),
				map((x: any) => {
					console.log(x)
					let response: Reservation[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = [];
					}
					return response;
				}),
        		catchError(this.handleError<any>(`Reservations`, [])) );
			
	}
}