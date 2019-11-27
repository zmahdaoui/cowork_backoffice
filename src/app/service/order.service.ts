import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../model/order';

@Injectable()
export class OrderService {
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
    
    getOrders(location : string): Observable<Order[]>{
		const url = `${this.basesUrl}openspace/orders/${location}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.get<Order[]>(url,header)
			.pipe(
				tap(_ => this.log(`fetched Orders`)),
				map((x: any) => {
					console.log(x)
					let response: Order[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = [];
					}
					return response;
                })
            );
			
	}
}