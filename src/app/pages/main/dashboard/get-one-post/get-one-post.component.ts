import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { IComment, ICommentsResponse, IPosts } from '../../../../core/interface/IPosts';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-one-post',
  imports: [CommonModule],
  standalone: true,  
  templateUrl: './get-one-post.component.html',
  styleUrl: './get-one-post.component.scss'
})
export class GetOnePostComponent implements OnInit {
  constructor(private _postsService:PostsService,private route: ActivatedRoute){}
  errorComments= '';
  loadingComments = true;
  errorGetPost= '';
  loadingGetPost = true;
  post: any = null;
  postComment: IComment[] = [];

  @Input() id!: number;   // The post we want comments for
  comments: any[] = [];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.route.snapshot.paramMap.get('postId');

    console.log("idParam =", id); // ← check what you receive
    console.log("PARAM KEYS:", this.route.snapshot.paramMap.keys);

    if (!id || id < 1) {
      console.error('Invalid post ID:', id);
      return;
    }
    this.loadPost(id);
    if (id) {
      this.loadComments(id);
    } else {
      console.error('Post ID is missing');
    }
  };

  private findPostInLocalArray(id: number): IPosts | null {
    // Check if posts array exists and has items
    if (!this.post || !Array.isArray(this.post) || this.post.length === 0) {
      return null;
    }
    
    // Find the post by ID
    const foundPost = this.post.find(post => post.id === id);
    
    return foundPost || null;
  }

  loadPost(id: number) {
    this.loadingGetPost = true;
    const localPost = this.findPostInLocalArray(id);
    this._postsService.getPost(id).subscribe({
      next: (res) => {
        this.post = res || null;
        this.loadingGetPost = false;
      },
      error: (err) => {
        console.log('Error loading post:', err);
        this.loadingGetPost = false;
        this.errorGetPost = 'Failed to load post'
      }
    });
  };

  loadComments(postId: number) {
    this.loadingComments = true;
    this._postsService.getPostComment(postId).subscribe({
      next: (data) => {
        this.comments = data.comments;
        this.loadingComments = false;
      },
      error: (err) => {
        console.log('Error loading comments:', err);
        this.loadingComments = false;
        this.errorComments = 'Oops something went wrong'
      }
    })
  };


 

}
