import { calculateElapsed } from "../utils/Helper";
import { CommentData } from "../interfaces";
class Comment {
  private commenter: string;
  private commenterId: number;
  private blogId: number;
  private body: string;
  private likes: number;
  private dislikes: number;
  private created: string;
  private id: number;

  constructor(
    commenter: string,
    commenterId: number,
    blogId: number,
    body: string,
    created: string,
    likes: number,
    dislikes: number,
    id: number
  ) {
    this.commenter = commenter;
    this.commenterId = commenterId;
    this.blogId = blogId;
    this.body = body;
    this.likes = likes;
    this.dislikes = dislikes;
    this.created = created;
    this.id = id;
  }

  public static parseData(data: CommentData[]): Comment[] {
    return data.map(
      (ele) =>
        new Comment(
          ele.commenter,
          ele.commenterId,
          ele.blog_id,
          ele.body,
          ele.created_at,
          ele.likes,
          ele.dislikes,
          ele.id
        )
    );
  }

  public render(): JSX.Element {
    return (
      <div className="pb-2" key={this.id}>
        <div className="card p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="user d-flex flex-row align-items-center w-75">
              <span>
                <small className="font-weight-bold text-primary mr-2 fs-4">
                  @{this.commenter}
                </small>

                <small className="d-flex">{this.body}</small>
              </span>
            </div>
            <small>{calculateElapsed(this.created)}</small>
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
