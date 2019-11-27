import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Borrowing } from '../model/borrowing';

@Injectable()
export class BorrowingService {
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
    
    getBorrowings(location : string): Observable<Borrowing[]>{
		const url = `${this.basesUrl}openspace/borrowing/${location}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		};
		return this.http.get<Borrowing[]>(url,header)
			.pipe(
				tap(_ => this.log(`fetched Borrowings`)),
				map((x: any) => {
					let response: Borrowing[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = [];
					}
					return response;
				}),
        		catchError(this.handleError<any>(`Borrowings`, [])) );
			
	}
}