import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICommentsResponse, IPosts, PostsResponse } from '../interface/IPosts';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  

  constructor(private _httpclient: HttpClient) { }

  baseUrl = 'https://dummyjson.com';

  getAllPosts(): Observable<PostsResponse> {
    return  this._httpclient.get<PostsResponse>(`${this.baseUrl}/posts`);
  };

  getPost(id: number): Observable<IPosts> {
    return this._httpclient.get<IPosts>(`${this.baseUrl}/posts/${id}`);
  };

  getPostComment(id: number): Observable<ICommentsResponse> {
    return this._httpclient.get<ICommentsResponse>(`${this.baseUrl}/posts/${id}/comments`);
  };

  addPost(post:IPosts): Observable<any> {
    return this._httpclient.post(`${this.baseUrl}/posts/add`, post)
  };
  
  updatePost(post:IPosts): Observable<IPosts> {
    return this._httpclient.put(`${this.baseUrl}/posts/${post.id}`, post)
  };

  deletePost(id:number):  Observable<any> {
    return this._httpclient.delete(`${this.baseUrl}/posts/${id}`)
  };



}
