export interface LoginResponse {
  data: LoginData;
}
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
}

export interface AuthFormProps {
  // handleLogin: Function;
  handleSuccessfulAuth: Function;
}

export interface DashboardProps {
  authenticated: boolean;
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

export enum AllTags {
  Animals,
  Art,
  Travel,
  Sport,
  Discussion,
  News,
  Gaming,
  Help,
  Other,
}

export const tagSuggestions = Object.keys(AllTags)
  .filter((v) => isNaN(Number(v)))
  .map((tag) => tag);
