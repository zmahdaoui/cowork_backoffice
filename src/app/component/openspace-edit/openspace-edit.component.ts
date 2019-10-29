import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OpenSpace } from '../../model/open-space';
import { OpenSpaceReq } from '../../model/openspace-req';
import { OpenspaceService } from '../../service/openspace.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Component({
  selector: 'edit-openspace',
  template: `
    <my-nav-bar></my-nav-bar>
    <h2 class="header center">Editer {{ openspace?.name }}</h2>
    <openspace-form [openspace]="openspace"></openspace-form>
  `,
})
export class EditOpenspaceComponent implements OnInit {

  openspace: OpenSpaceReq = null;
	helper = new JwtHelperService();

  constructor(
    private route: ActivatedRoute,
    private openSpaceService: OpenspaceService,
		private router: Router) {}

  ngOnInit(): void {
    if(this.helper.isTokenExpired(localStorage.getItem('token'))){
			console.log('expired')
			localStorage.clear()
			this.router.navigateByUrl('login')
		}
    let id = +this.route.snapshot.params['id'];
		this.openSpaceService.getOpenspace(id)
			.subscribe(openspace => {
        this.openspace = new OpenSpaceReq(openspace.id,openspace.location,
                                          openspace.wifi,
                                          openspace.drink,
                                          openspace.plateau_repas,
                                          openspace.conf_room,
                                          openspace.call_room,
                                          openspace.cosy_room,
                                          openspace.printers,
                                          openspace.laptops,
                                          parseInt(openspace.schedule_mt.split(',')[0]),
                                          parseInt(openspace.schedule_mt.split(',')[1]),
                                          parseInt(openspace.schedule_f.split(',')[0]),
                                          parseInt(openspace.schedule_f.split(',')[1]),
                                          parseInt(openspace.schedule_we.split(',')[0]),
                                          parseInt(openspace.schedule_we.split(',')[1]),
                                          openspace.adresse)
      });
  }

}