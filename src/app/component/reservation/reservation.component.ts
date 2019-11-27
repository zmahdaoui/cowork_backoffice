import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from '../../service/reservation.service';
import { Reservation } from '../../model/reservation';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: 'reservation',
	templateUrl: './reservation.component.html'
})
export class ReservationComponent implements OnInit {
	helper = new JwtHelperService();
	@Input() location: string;
	reservations: Reservation[];
    page: number;
    pageSize: number;

	constructor(
		private reservationService: ReservationService,
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
		this.reservationService.getReservations(this.location)
			.subscribe(reservations => {
				this.reservations = reservations
			})
	}
}