import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OpenspaceService } from '../../service/openspace.service';
import { OpenSpaceReq } from '../../model/openspace-req';

@Component({
	selector: 'create-openspace',
    templateUrl: `./openspace-create.component.html`
})
export class OpenspaceCreateComponent {

    @Input() openspace: OpenSpaceReq;
    message: string;

    constructor(private router: Router, private openspaceService: OpenspaceService){}

	ngOnInit(){
        this.openspace = new OpenSpaceReq(0,'',null,null,null,0,0,0,0,0,0,0,0,0,0,0,'')
    }

    onSubmit(): void {
		this.openspaceService.createOpenspace(this.openspace)
			.subscribe(updated => {
				if(updated.status == 1)
                    this.goBack(updated.result.id);
                else
                    this.message = updated.message;
			})
    }

    goBack(id: number): void {
		let link = ['/openspace', id];
		this.router.navigate(link);
	}
}