import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

 
@Component({
	selector: 'my-nav-bar',
    template: `
                <nav>
                <div class="nav-wrapper teal">
                <a href="#" class="brand-logo left" >cowork pro</a>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a (click)="navigateToCreateOpenspace()">créer openspace</a></li>
                    <li><a (click)="navigateToLogin()">log out</a></li>
                </ul>
                </div>
                </nav>
            `
})
export class NavBarComponent {

    constructor(private router: Router, private authSevice: AuthService){}

	ngOnInit(){
    }

    navigateToLogin(){
        this.authSevice.logout();
        this.router.navigateByUrl('login');
    }

    navigateToCreateOpenspace(){
        this.router.navigateByUrl('openspace/create');
    }

}