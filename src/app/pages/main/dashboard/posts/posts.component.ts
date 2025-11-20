import { Component, Input } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { ICommentsResponse, IPosts, PostsResponse } from '../../../../core/interface/IPosts';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    ChipModule,
    SelectModule,
    TextareaModule,
    ConfirmPopupModule,
    InputTextModule,
    FloatLabel,
    FormsModule,
    DialogModule, 
    ButtonModule,
    ToastModule,
    AnimateOnScrollModule,
    FormsModule
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [ConfirmationService,MessageService],
})
export class PostsComponent {
  constructor(
    private _postsService:PostsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService, 
    private _router:Router){}

  @Input() searchKey: string = '';
  @Input({required: true}) posts!:IPosts[];
  editingPost: IPosts | null = null;
  dialogUpdtaeVisible: boolean = false;
  error = '';


  deletePost(postId: number) {
    this._postsService.deletePost(postId).subscribe({
      next: () => {
        this.posts = this.posts.filter(p => p.id !== postId);
        console.log('Post deleted successfully');
      },
      error: err => console.error('Delete failed', err)
    });
  };

  getPostData: IPosts[] = [];

  updatePost(updatedPost: IPosts): void {
    this._postsService.updatePost(updatedPost).subscribe({
      next: (res: IPosts) => {
        this.posts = this.posts.map(post => post.id === updatedPost.id 
        ? { ...post, ...res } : post);  // Merge old and new data
      },
      error: (err) => {
        console.error('Error updating post:', err);  
        this.messageService.add({ severity: 'danger', summary: 'Something went wrong', detail: 'Failed to update', key: 'br', life: 3000 }); 
      }
    });
  };

  openEditDialog(post: IPosts): void {
    this.editingPost = { ...post };
    this.dialogUpdtaeVisible = true;
  };

  savePost(): void {
    if (this.editingPost) {
      this.updatePost(this.editingPost);
    this.dialogUpdtaeVisible = false;
      this.editingPost = null;
    }
  };


  confirmDelete(event: Event, postId: number) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Do you want to delete this record?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.deletePost(postId); // call your actual delete method
        this.messageService.add({ severity: 'error', summary: 'Post Deleted', detail: ' ', life: 3000 });
      }
    });
  };

  openPost(id?: number) {
    if (!id) return;
    this._router.navigate(['/user/posts', id]);
  };


  



}
