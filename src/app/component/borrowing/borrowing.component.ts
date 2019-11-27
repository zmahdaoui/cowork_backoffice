import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BorrowingService } from '../../service/borrowing.service';
import { Borrowing } from '../../model/borrowing';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: 'borrowing',
	templateUrl: './borrowing.component.html'
})
export class BorrowingComponent implements OnInit {
	helper = new JwtHelperService();
	@Input() location: string;
	borrowings: Borrowing[];
    page: number;
    pageSize: number;

	constructor(
		private borrowingService: BorrowingService,
		private router: Router) { }

	ngOnInit() {
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			this.router.navigateByUrl('login')
		}
		this.getReservations()
        this.page = 1;
        this.pageSize = 7;
	}

	getReservations(): void {
		this.borrowingService.getBorrowings(this.location)
			.subscribe(borrowings => {
				this.borrowings = borrowings
			})
	}
}