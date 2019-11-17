import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenSpace } from '../../model/open-space';
import { OpenspaceService } from '../../service/openspace.service';
import { JwtHelperService } from "@auth0/angular-jwt";
 
@Component({
	selector: 'openspace-detail',
	templateUrl: './openspace-detail.component.html'
})
export class OpenspaceDetailComponent {
	private openSpace: OpenSpace = null;
	helper = new JwtHelperService();

	constructor(private route: ActivatedRoute, private router: Router, private openspaceService: OpenspaceService){}

	ngOnInit(){
		if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			localStorage.clear()
			this.router.navigateByUrl('login')
		}
		this.getOpenspace();
	}

	private getOpenspace(): void{
        let id = +this.route.snapshot.paramMap.get('id');
		this.openspaceService.getOpenspace(id)
			.subscribe(openSpace => {
				this.openSpace = openSpace});
	}

	private goEdit(): void{
		let link = ['/openspace/edit', this.openSpace.id];
		this.router.navigate(link);
	}

	private delete(): void{
		this.openspaceService.delete(this.openSpace.id)
			.subscribe(result => {
				if(result){
					this.router.navigateByUrl("openspace/list");
				}
			})
	}
}