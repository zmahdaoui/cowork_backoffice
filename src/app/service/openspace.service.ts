import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { OpenSpace } from '../model/open-space';
import { OpenSpaceReq } from '../model/openspace-req';

@Injectable()
export class OpenspaceService {
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
    
    getOpenspaces(): Observable<OpenSpace[]>{
		const url = `${this.basesUrl}open_space`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.get<OpenSpace[]>(url,header)
			.pipe(
				map((x: any) => {
					let response: OpenSpace[];
					if(x.status == 1){
						response = x.result;
					}else{
						response = []
					}
					return response;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
				}),
        		catchError(this.handleError<any>(`Openspaces`, [])) )
			
	}

	getOpenspace(id: number): Observable<OpenSpace>{
		const url = `${this.basesUrl}open_space/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.get<OpenSpace>(url,header)
			.pipe(
				map((x: any) => {
					let response: OpenSpace;
					if(x.status == 1){
						response = x.result;
					}else{
						response = null
					}
					return response;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
				}),
        		catchError(this.handleError<any>(`Openspace `, null)) )
	}

	updateOpenspace(openspace: OpenSpaceReq): Observable<boolean>{
		const url = `${this.basesUrl}open_space/${openspace.id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.put<boolean>(url, openspace, header)
			.pipe(
				map((x: any) => {
					let response: boolean;
					if(x.status == 1){
						response = x.result;
					}else{
						response = x.result;
					}
					return response;//new LoginResponse(x.status, new User(x.result.id,x.result.first_name, x.result.last_name, x.result.email, x.result.age, x.result.date_inscription, x.result.client), x.message);
				}),
        		catchError(this.handleError<any>(`Openspace `, null)) )
	}

	createOpenspace(openspace: OpenSpaceReq):Observable<any>{
		const url = `${this.basesUrl}open_space/create`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.post<any>(url,openspace,header)
			.pipe(
				map((x: any) => {
					return x;
				})
			)
	}

	delete(id:number): Observable<boolean>{
		const url = `${this.basesUrl}open_space/${id}`;
		var header = {
			headers: new HttpHeaders()
							.set('Authorization', 'Bearer '+localStorage.getItem('token'))
		}
		return this.http.delete<boolean>(url,header)
			.pipe(
				map((x: any) => {
					let response: boolean;
					if(x.status == 1){
						response = x.result;
					}else{
						response = x.result;
					}
					return response;
				})
			)
	}
}