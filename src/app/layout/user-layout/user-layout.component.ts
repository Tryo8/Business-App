import { Component } from '@angular/core';
import { UserNavComponent } from '../components/user-nav/user-nav.component';
import { UserFooterComponent } from "../components/user-footer/user-footer.component";
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from "../components/breadcrumb/breadcrumb.component";




@Component({
  selector: 'app-user-layout',
  imports: [UserNavComponent, RouterOutlet, BreadcrumbComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
