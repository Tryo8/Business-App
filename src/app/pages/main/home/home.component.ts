import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { IQuote, QuotesService } from '../../../core/services/quotes.service';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/interface/User';
import { BadgeModule } from 'primeng/badge';
import { TagModule } from 'primeng/tag';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ISales } from '../../../core/interface/ISales';
import { SalesService } from '../../../core/services/sales.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [
    BadgeModule,
    OverlayBadgeModule,
    TagModule,
    AvatarModule,
    RouterLink,
    CommonModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private _spinner:NgxSpinnerService, 
    private _quotesService:QuotesService,
    private _userService:UserService,
    private _router:ActivatedRoute,
    private _route:Router,
    private _salesService:SalesService
  ){};


  user: User | any = null;
  displayQoute:any[] | any ;
  lastQuoteDate: string | null = null;
  users: User[]  = [];
  loading = false;
  error = '';
  usersDetails: User  | null = null
  salesInfo: ISales[] | any = [];

  ngOnInit() {
    this._router.params.subscribe(params => {
      const userId = params['id'];
      this.getUserDetails(userId);
    });
    this.loadUsers();
    this.getSalesInfo();
    
    this.user = this._userService.getUser();
    /** spinner starts on init */
    this._spinner.show();
    this.checkAndLoadQuote();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._spinner.hide();
    }, 1000);
  };

  // QUOTE METHOD TO GET QOUTES
  getRandomQuote(): void{
    this._quotesService.getRnaodmQuotes().subscribe({
      next: (res) => {
        this.displayQoute = res;
        const today = new Date().toDateString();
        localStorage.setItem('dailyQuote', JSON.stringify(res));
        localStorage.setItem('lastQuoteDate', today);
      },
      error: (err) => {
        console.log('Error loading qoute:', err);
      }
    })
  };

  // QUOTE METHOD TO CHECK QUOTE TIME
  checkAndLoadQuote(): void {
    const today = new Date().toDateString();
    this.lastQuoteDate = localStorage.getItem('lastQuoteDate');
    if (this.lastQuoteDate === today) {
      const savedQuote = localStorage.getItem('dailyQuote');
      if (savedQuote) {
        this.displayQoute = JSON.parse(savedQuote);
      }
    } else {
      this.getRandomQuote();
    }
  };

  //LOAD 5 USERS
  loadUsers(): void {
    this.loading = true;
    this._userService.getUsers().subscribe({
      next: (response) => {
        this.loading = false;
        this.users = response.users;
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Oops something went wrong!';
        console.error('Error loading users:', error);
      }
    });
  };

  getUserDetails(id: number): void {
    this.loading = true;
    this._userService.getUserById(id).subscribe({
      next:(res) => {
        this.loading = false;
        this.usersDetails = res;
        this._route.navigate([`/user/employees/${id}`]);
      },
      error: (err) => {
        this.loading = false;
        console.log('Error loading user detials:' , err);
      }
    })
  };

  getSalesInfo(): void {
    this._salesService.getSales().subscribe({
      next: (res) => {
        this.salesInfo = res;
        console.log(res);
      },
      error: (err) => {
        console.log('Error getting sales info:', err);
      }

    })
  };



}
