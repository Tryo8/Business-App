
export interface IPosts {
    showFull?: boolean;
    id?: number;
    title?: string;
    body?: string;
    userId?: number;
    tags?: string[];
    reactions?: { likes?: number; dislikes?: number };
    views?: number;
    newPost?: boolean;
    createdAt?:string | Date;
    commentsCount?:ICommentsResponse | number; 
    
}

export interface PostsResponse {
  posts?: IPosts[];
  total?: number;
  skip?: number;
  limit?: number;
}

// comments

export interface ICommentUser {
  id: number;
  username: string;
  fullName: string;
}

export interface IComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: ICommentUser;

}

export interface ICommentsResponse {
  comments: IComment[];
  total?: number;
  skip: number;
  limit: number;
}
