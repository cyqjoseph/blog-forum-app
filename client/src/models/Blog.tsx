import axios from "axios";
import { BlogData } from "../interfaces";
import { calculateElapsed } from "../utils/Helper";
class Blog {
  private creator: string;
  private creatorId: number;
  private title: string;
  private body: String;
  private likes: number;
  private dislikes: number;
  private created: string;
  private id: number;
  private tag_list: string[];

  constructor(
    creator: string,
    creatorId: number,
    title: string,
    body: String,
    created: string,
    id: number,
    tag_list: string[],
    likes = 0,
    dislikes = 0
  ) {
    this.creator = creator;
    this.creatorId = creatorId;
    this.title = title;
    this.body = body;
    this.likes = likes;
    this.dislikes = dislikes;
    this.created = created;
    this.id = id;
    this.tag_list = tag_list;
  }

  public static parseBlogs = function (data: BlogData[]): Blog[] {
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
    return ret.reverse();
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
              {this.title} -{" "}
              <span className="text-primary">@{this.creator}</span>
            </div>
            <div className="">
              <button className="btn btn-sm btn-success mx-1">
                Likes: {this.likes}
              </button>
              <button className="btn btn-sm btn-danger ">
                Disikes: {this.dislikes}
              </button>
              <button
                className="btn btn-primary btn-sm border-dark mx-1"
                onClick={this.getBlogPageHandler.bind(this)}
              >
                Read more &#x2192;
              </button>
            </div>
          </h4>

          <h4 className="text-center py-3 mx-5">
            {this.body} - ({calculateElapsed(this.created)})
          </h4>
          <div className="lead d-flex justify-content-around pb-2">
            <div className="">
              <div className="d-flex">
                {this.tag_list.map((ele) => (
                  <div className="mx-1">
                    <button className="btn btn-sm btn-light border border-dark">
                      #{ele}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  private getBlogPageHandler() {
    //can just route directly??
    // window.location.assign(`/blog/${this.id}`);
    axios
      .get(`http://localhost:3001/users/${this.creatorId}/blogs/${this.id}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          window.location.assign(`/blog/${this.id}`);
        }
      })
      .catch((e) => {});
  }

  public getReputation(): number {
    return this.likes - this.dislikes;
  }
}

export default Blog;
