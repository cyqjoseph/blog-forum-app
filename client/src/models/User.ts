import Blog from "./Blog";
import Comment from "./Comment";
// add id on blogs and comments so they can be removed
// add follower functionality later, for now every post is public
class User {
  private email: string;
  private password: string;
  private name: string;
  private reputation: number = 0;
  private blogs: Blog[] = [];
  private comments: Comment[] = [];

  constructor(email: string, password: string, name: string) {
    this.email = email;
    this.password = password;
    this.name = name;
  }

  public postNewBlog(message: string): void {
    // const newBlog: Blog = new Blog(this, message);
    // this.blogs.push(newBlog);
  }

  public postNewComment(message: string): void {
    // const newComment: Comment = new Comment(this, message);
    // this.comments.push(newComment);
  }

  public getReputation() {
    let reputation = 0;
    for (const blog of this.blogs) {
      this.reputation += blog.getReputation();
    }
    return 0 ? reputation <= 0 : reputation;
  }
}

export default User;
