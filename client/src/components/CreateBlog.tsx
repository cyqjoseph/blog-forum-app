import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { TagsInput } from "react-tag-input-component";
import Header from "./Header";
function CreateBlog() {
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const user = useTypedSelector((state: RootState) => state.user);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const createBlogHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const title = titleRef.current!.value;
    const body = bodyRef.current!.value;
    const tag_list = tags.join(", ");
    const blog = {
      title,
      body,
      creator: user.username,
      creatorId: user.id,
      likes: 0,
      dislikes: 0,
      tag_list,
    };
    axios
      .post(
        `http://localhost:3001/users/${user.id}/blogs`,
        { blog },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Post created successfully");
        navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        <div className="d-flex flex-column justify-content-center pt-5 ">
          <div className="fs-1 fw-bold d-block text-center ">
            Create a new blog!
          </div>
          <hr className="border border-dark opacity-50" />
          <form onSubmit={createBlogHandler} className="text-center">
            <div className="form-group py-3">
              <label className="form-check-label py-3 d-flex flex-column justify-content-center align-items-center fs-2 text-center">
                Blog Title
              </label>
              <input type="text" className="form-control" ref={titleRef} />
            </div>
            <div className="form-group py-3">
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-2">
                Blog Text
              </label>
              <textarea
                className="form-control"
                rows={3}
                ref={bodyRef}
              ></textarea>
            </div>
            <div>
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-2">
                Blog Tags
              </label>
              <TagsInput
                value={tags}
                onChange={setTags}
                name="tags"
                placeHolder="Enter blog tags"
              />
              <em className="form-text">
                Press Enter or Comma to add a new tag
              </em>
            </div>
            <div className="py-5 d-flex flex-column align-items-center">
              <button type="submit" className="btn btn-success btn-lg">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
export default CreateBlog;
