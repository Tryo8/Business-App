import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink ,RouterLinkActive} from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interface/User';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { Popover, PopoverModule } from 'primeng/popover';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-user-nav',
  imports: [
    OverlayBadgeModule,
    SplitButtonModule,
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    Ripple,
    RouterLink,
    RouterLink,
    RouterLinkActive,
    ConfirmDialogModule,
    PopoverModule,
],
  templateUrl: './user-nav.component.html',
  styleUrl: './user-nav.component.scss',
  providers: [ConfirmationService,MessageService]
})
export class UserNavComponent {
    constructor(
        private _user:UserService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService, 
        private _router:ActivatedRoute, 
        private _route:Router)
    {}

    user: User | any = null;
    isLight = false;
    navItems: MenuItem[] | undefined;
    userItems: MenuItem[] | undefined;
    usersDetails: User  | null = null;
    isThemeToggled: boolean = false;

    ngOnInit() {
        this.user = this._user.getUser();
        console.log(this.user)
        this.navItems = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: 'home',
            },
            {
                label: 'Dashboard',
                icon: 'pi pi-objects-column',
                routerLink: 'dashboard',
            },
            {
                label: 'Menu',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Employees',
                        icon: 'pi pi-users',
                        routerLink: 'employees'
                      
                    },
            
                ],
            },
        ];
        this.userItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                routerLink: 'profile'                
            },
            {
                label: 'Light',
                icon: 'pi pi-sun',
                command: () => {
                    this.toggleTheme()
                }
            },
            {
                separator: true,
            },
            {
                label: 'Logout',
                icon: 'pi pi-power-off',
                style:{ 'color': 'red' },
                command: ()=> {
                    this.confirmLogout(event)
                }
            },
        ];
        
    }

    toggleTheme() {
        this.isLight = !this.isLight;
        if (this.isLight) {
            document.body.classList.add('light-theme');
            this.isThemeToggled = !this.isThemeToggled
            this.loadMenu()
        } else {
            document.body.classList.remove('light-theme');
        }
    };
    loadMenu() {
        this.userItems = [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                routerLink: 'profile'                
            },
            {
                label: 'Grey',
                icon:'pi pi-moon',
                command: () => this.toggleTheme()
            },
            {
                separator: true,
            },
            {
                label: 'Logout',
                icon: 'pi pi-power-off',
                style:{ 'color': 'red' },
                command: ()=> {
                    this.confirmLogout(event)
                }
            },
        ];
    }
 

    confirmLogout(event: Event | any) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Are you sure you want logout?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: ' logout ',
                severity: 'danger',
            },
            accept: () => {
                this._user.logout();
            }
        });
    };

    getUserDetails(id: number): void {
        this._user.getUserById(id).subscribe({
            next:(res) => {;
                this.usersDetails = res;
                this._route.navigate([`/us/profile`]);
            },
            error: (err) => {
                console.log('Error loading user detials:' , err);
            }
        })
    };



}
