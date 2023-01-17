import { BlogData } from "../interfaces";
import { calculateElapsed, truncateBlog } from "../utils/Helper";
import { Link } from "react-router-dom";

/* 
  Blog class to encapsulate a blog's contents, contains a static method parseBlogs to parse JSON data into a Blog instance and a render method to generate JSX for each blog instance
*/
class Blog {
  private creator: string;
  private creatorId: number;
  private title: string;
  private body: string;
  private created: string;
  private id: number;
  private tag_list: string[];

  constructor(
    creator: string,
    creatorId: number,
    title: string,
    body: string,
    created: string,
    id: number,
    tag_list: string[]
  ) {
    this.creator = creator;
    this.creatorId = creatorId;
    this.title = title;
    this.body = body;

    this.created = created;
    this.id = id;
    this.tag_list = tag_list;
  }

  public static sortBlogs = function (data: BlogData[]) {
    data.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  };

  public static parseBlogs = function (data: BlogData[]): Blog[] {
    Blog.sortBlogs(data);
    let ret: Blog[] = [];
    for (const ele of data) {
      let temp = new Blog(
        ele.creator,
        ele.creatorId,
        ele.title,
        ele.body,
        ele.created_at,
        ele.id,
        ele.tag_list
      );
      ret.push(temp);
    }
    return ret;
  };

  public static renderAll(data: Blog[]) {
    return data.map((blog) => blog.render());
  }

  public render(): JSX.Element {
    return (
      <div key={this.id} className="pb-2">
        <div className="card border border-dark ">
          <h4 className="card-header display-8 text-center py-4 d-flex justify-content-around">
            <div>
              <Link
                className="text-primary text-decoration-none"
                to={`/profile/${this.creatorId}`}
              >
                @{this.creator}
              </Link>
              &nbsp; - {this.title}
            </div>
          </h4>

          <h4 className="text-center py-3 mx-5">{truncateBlog(this.body)}</h4>
          <div className="lead d-flex justify-content-around pb-2">
            <div className="d-flex">
              {this.tag_list.map((ele) => (
                <div className="mx-1">
                  <button className="btn btn-sm btn-light border border-dark">
                    #{ele.toLowerCase()}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <hr className="border border-secondary border-1 opacity-50" />
          <div className="d-flex justify-content-around  align-items-center pb-3">
            <div className="text-secondary">
              {calculateElapsed(this.created)}
            </div>
            <div className="">
              <Link
                className="btn btn-primary btn-sm border-dark mx-1"
                to={`/blog/${this.id}`}
              >
                Read more &#x2192;
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
