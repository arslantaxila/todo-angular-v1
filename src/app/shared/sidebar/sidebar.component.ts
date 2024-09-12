import { Component, ElementRef, Output, EventEmitter } from '@angular/core'
import { LayoutService } from '../layout-service/app.layout.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  ActivatedRoute,
  NavigationStart,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})

export class SidebarComponent {
  @Output() messageEvent = new EventEmitter<string>();

  completeModelname: any[] = []
  completeModel: any[] = [];
  model: any[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public layoutService: LayoutService,
    private authService: AuthenticationService,
    public el: ElementRef
  ) {
    
  }


  async ngOnInit() {

    this.completeModel = [
      {
        id: 1,
        items: [
          {
            label: 'Dashboard',
            icon: 'dashboard-i.svg',
            routerLink: ['/home'],
          },
        ],
      },

      {
        id: 2,
        items: [
          {
            label: 'ToDo',
            icon: 'appraisal-i.svg',
            routerLink: ['/todo'],
          },
        ],
      },


      {
        id: 3,
        items: [
          {
            label: 'Profile',
            icon: 'profile-i.svg',
            routerLink: ['/profile'],
          },
        ],
      },

  
      {
        id: 4,
        items: [
          {
            label: 'Logout',
            icon: 'signout-i.svg',
            routerLink: ['/logout'],
          },
        ],
      },
    ];

    this.model = this.completeModel;
  }

}
