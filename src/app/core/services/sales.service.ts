import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISales } from '../interface/ISales';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _httpClient:HttpClient) { }

  private salesUrl  = 'https://dummyjson.com/c/e69b-4705-406b-9537';


  getSales():Observable <ISales> {
    return this._httpClient.get<ISales>(this.salesUrl);
  };

}
