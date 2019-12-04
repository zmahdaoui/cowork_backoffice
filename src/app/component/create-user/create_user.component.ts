import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from 'src/app/model/user';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
	selector: 'create-user',
	templateUrl: './create_user.component.html'
})

export class CreateUserComponent {
	helper = new JwtHelperService();
	messageReg: string = '';
	private email2: string;
	private password: string;
	private user: User;
	model = {year:null, month:null, day:null};

	constructor(private userService: UserService, private router: Router) { }

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			this.router.navigateByUrl('login')
		}
		console.log("Dans Create User Pro")
		this.user = new User(null,"","","","","","","",null);
	}



	createUser(){
		let year = this.model.year;
		let month = this.model.month.toString();
		month = month.length<2? '0'+this.model.month : this.model.month
		let day = this.model.day.toString();
		day = day.length<2? '0'+this.model.day : this.model.day
		this.user.birthday = year+'/'+month+'/'+day+' 00:00:00';

		this.userService.createUser(this.user)
			.subscribe(user => {
				console.log(user)
				if(user.status == 0){
					alert('Email déja pris')
				}else{
					alert("Le compte "+this.user.email+" est créé")
					let redirect = '/openspace/list';
					this.router.navigate([redirect]);
				}
			});
	}
}