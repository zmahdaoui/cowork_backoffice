import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../service/order.service';
import { Order } from '../../model/order';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
	selector: 'order',
	templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {
	helper = new JwtHelperService();
	@Input() location: string;
	orders: Order[];
    page: number;
    pageSize: number;

	constructor(
		private orderService: OrderService,
		private router: Router) { }

	ngOnInit() {
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			this.router.navigateByUrl('login')
		}
		this.getOrders()
        this.page = 1;
        this.pageSize = 7;
	}

	getOrders(): void {
		this.orderService.getOrders(this.location)
			.subscribe(orders => {
				console.log(orders)
				this.orders = orders
			})
	}
}