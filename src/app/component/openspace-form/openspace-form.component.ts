import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OpenspaceService } from '../../service/openspace.service';
import { OpenSpaceReq } from '../../model/openspace-req';

@Component({
	selector: 'openspace-form',
	templateUrl: './openspace-form.component.html'
})
export class OpenspaceFormComponent implements OnInit {

    @Input() openspace: OpenSpaceReq;

	constructor(
		private openspaceService: OpenspaceService,
		private router: Router) { }

	ngOnInit() {
	}

	// La méthode appelée lorsque le formulaire est soumis.
	onSubmit(): void {
		this.openspaceService.updateOpenspace(this.openspace)
			.subscribe(updated => {
				if(updated)
					this.goBack();
			})
	}

	goBack(): void {
		let link = ['/openspace', this.openspace.id];
		this.router.navigate(link);
	}
}