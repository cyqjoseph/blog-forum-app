import { calculateElapsed } from "../utils/Helper";
import { CommentData } from "../interfaces";
import { Link } from "react-router-dom";
/* 
  Comment class to encapsulate a comment's contents, contains a static method parseData to parse JSON data into a Comment instance and a render method to generate JSX for each comment instance
*/
class Comment {
  private commenter: string;
  private commenterId: number;
  private blogId: number;
  private body: string;
  private created: string;
  private id: number;

  constructor(
    commenter: string,
    commenterId: number,
    blogId: number,
    body: string,
    created: string,
    id: number
  ) {
    this.commenter = commenter;
    this.commenterId = commenterId;
    this.blogId = blogId;
    this.body = body;
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
                <Link
                  className="font-weight-bold text-primary mr-2 fs-4 text-decoration-none"
                  to={`/profile/${this.commenterId}`}
                >
                  @{this.commenter}
                </Link>
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
