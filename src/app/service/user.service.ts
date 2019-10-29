import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from '../model/user';
import { Subscription } from '../model/subscription';

@Injectable()
export class UserService {
    private basesUrl = 'http://localhost:3030/api-sg/v1/';
	helper = new JwtHelperService();

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

    getUser(): Observable<User>{
        let token = localStorage.getItem('token');
		let decodedToken = this.helper.decodeToken(token);
		const url = `${this.basesUrl}users/${decodedToken.logger.id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.get<User>(url,header)
			.pipe(
				tap(_ => this.log(`fetched User ${decodedToken.logger.id}`)),
				map((x: any) => {
					let response: User;
					if(x.status == 1){
						response = x.result;
					}else{
						response = decodedToken.logger;
					}
					return response;
				}),
        		catchError(this.handleError<any>(`User`, decodedToken.logger.id)) )
	}

	getUserSubscription():Observable<Subscription>{
		let token = localStorage.getItem('token');
		let decodedToken = this.helper.decodeToken(token);
		const url = `${this.basesUrl}user/subscriptions/${decodedToken.logger.id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.get<Subscription>(url, header)
			.pipe(map((x: any) => {
				let response: Subscription;
				if(x.status == 1){
					response = x.result;
				}else{
					response = x.message;
				}
				return response;
			}))
	}

	createSubscription(id: number):Observable<Subscription>{
		let token = localStorage.getItem('token');
		let decodedToken = this.helper.decodeToken(token);
		const url = `${this.basesUrl}subscriptions/create`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.post<Subscription>(url, {subscription_type:id, user_id:decodedToken.logger.id})
			.pipe(map((x:any)=> {
				let response: Subscription;
				if(x.status == 1){
					response = x.result;
				}else{
					response = x.message;
				}
				return response;
			}))
	}


}