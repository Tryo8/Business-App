import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IQuote {
  id?:number,
  quote?:string,
  author?:string
}

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  constructor(private _http: HttpClient) { }

  baseUrl = 'https://dummyjson.com';


  getRnaodmQuotes():Observable<IQuote> {
    return this._http.get<IQuote>(`${this.baseUrl}/quotes/random`);
  };
}
