import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PostsComponent } from "./posts/posts.component";
import { InputTextModule } from 'primeng/inputtext';
import { SearchPostsPipe } from '../../../core/pipes/search-posts.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ICommentsResponse, IPosts, PostsResponse } from '../../../core/interface/IPosts';
import { PostsService } from '../../../core/services/posts.service';
import { Select, SelectModule } from 'primeng/select';
import { FilterPostsPipe } from '../../../core/pipes/filter-posts.pipe';
import { DialogModule } from 'primeng/dialog';
import { RoomComponent } from "./room/room.component";
import { ButtonModule } from 'primeng/button';
import { TextareaModule } from 'primeng/textarea';
import { FloatLabel } from 'primeng/floatlabel';
import { GetOnePostComponent } from "./get-one-post/get-one-post.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [
    PostsComponent,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    SearchPostsPipe,
    CommonModule,
    FormsModule,
    SelectModule,
    FilterPostsPipe,
    DialogModule,
    Select,
    ButtonModule,
    TextareaModule,
    FloatLabel,
    RoomComponent,
    SelectModule,
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private _postsService:PostsService){}

  loading = false;
  error = '';
  dialogFilterVisible: boolean = false;
  //POSTS
  posts: IPosts[] = [];
  //FOR SEARCH PIPE
  searchTitle: string = '';
  //LIKES FILTER BASED ON HIGHEST OR LOWEST
  likesFilter: any[] | undefined;
  selectedFilter: any | undefined;
  //NEW POST TO ADD
  newPost: IPosts = {
    title: '',
    body: '',
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
    createdAt: ''
  };

  ngOnInit(postId:number): void {
    this.getAllPosts();
      this.likesFilter = [
      { name: 'Most Viewed', value: 'mostViewd',icon:'pi pi-eye' },
      { name: 'Most Liked', value: 'highestLiked',icon:'pi pi-thumbs-up text-success' },
      { name: 'Most Disliked', value: 'highestDisliked' ,icon:'pi pi-thumbs-down text-danger '},
    ];

  };

  getAllPosts(): void {
    this.loading = true;
    this._postsService.getAllPosts().subscribe({
      next: (res:PostsResponse) => {
        this.loading = false;
        this.posts = res.posts || [];
        this.loadCommentsForAllPosts();
        console.log('Posts loaded:', this.posts);
      },
      error: (err) => {
        this.loading = false;
        console.log('Error loading posts:' ,err)
      }
    })
  };
  
  // fake add to posts, to make it legit..backend
  addPost(): void {
    //time logic
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    let hoursP = now.getHours();
    const ampm = hoursP > 12 ? 'PM' : 'AM';
    hoursP = hoursP % 12 || 12;
    const createdAt = `${hours}:${minutes} ${ampm}, ${day}/${month}/${year}`;
 
    this._postsService.addPost(this.newPost).subscribe((res) => {
      console.log('Post added:', res);
      const postWithDate = { 
        ...res, 
        createdAt: createdAt 
      };
      this.posts.push(postWithDate);
      this.newPost = { title: '', body: '', userId: 1 ,reactions: { likes: 0, dislikes: 0 },
      views: 0,createdAt:'',tags:[]};
      this.dialogFilterVisible = false;
    })
    console.log(this.newPost.createdAt);
  };

  showAddPostDialog() {
    this.dialogFilterVisible = true;
  };

  //idk what happens after line 132..
  loadCommentsForAllPosts(): void {
    this.posts.forEach(post => {
      if (post.id) {
        this._postsService.getPostComment(post.id).subscribe({
          next: (commentsResponse: ICommentsResponse) => {
            const postToUpdate = this.posts.find(p => p.id === post.id);
            if (postToUpdate) {
              postToUpdate.commentsCount = commentsResponse.total;
            }
          },
          error: (err) => {
            console.log('Error loading comments for post', post.id, err);
          }
        });
      }
    });
  };

}
