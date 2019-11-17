import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { Subscription } from '../../model/subscription';
import { UserService } from '../../service/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import date from 'date-and-time';
 
@Component({
	selector: 'profile-information',
	templateUrl: './profile-information.component.html'
})
export class ProfileInformationComponent {
	private Subscription : Subscription;
	private User: User;
	private age: number;
	helper = new JwtHelperService();

	constructor(private router: Router, private userService: UserService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear()
			this.router.navigateByUrl('login')
		}
		this.User = null;
		this.getUser();
	}

	private getUser(): void{
        this.userService.getUser()
			.subscribe(user => {
				this.User = user;
				let today = new Date();
				let birthday = date.parse(this.User.birthday,'YYYY/MM/DD HH:mm:SS');
				this.age = date.subtract(today, birthday).toDays();
				this.age = this.age/365;
				this.age = Math.floor(this.age);
			});
	}
}