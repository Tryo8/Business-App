import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouceService {

  constructor(private _httpClient:HttpClient) { }

  getAnnouceMents(): Observable<any> {
    return this._httpClient.get(`https://dummyjson.com/c/9fb8-6765-481d-92b0`);
  };
}
