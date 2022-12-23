// Contains interfaces used throughout the application
export interface LoginData {
  user: UserData;
  logged_out: boolean;
  logged_in: boolean;
  status: number;
  errors: string[];
}

export interface UserData {
  username: string;
  id: number;
  email?: string;
  password?: string;
  created_at?: string;
}
export interface AuthResponse {
  data: Partial<LoginData>;
  status: number;
  statusText: string;
}

export interface BlogData {
  creator: string;
  creatorId: number;
  body: string;
  created_at: string;
  dislikes: number;
  likes: number;
  id: number;
  title: string;
  updated_at: string;
  user_id: number;
  tag_list: string[];
}

export interface CommentFormData {
  commenter: string;
  commenterId: number;
  blogId: number;
  body: string;
  likes: number;
  dislikes: number;
}

export interface CommentData {
  body: string;
  created_at: string;
  commenter: string;
  commenterId: number;
  dislikes: number;
  id: number;
  likes: number;
  updated_at: string;
  blog_id: number;
}
