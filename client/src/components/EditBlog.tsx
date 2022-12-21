import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useRef, useCallback, useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BlogData } from "../interfaces";
import { TagsInput } from "react-tag-input-component";
import Header from "./Header";

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tags, setTags] = useState<string[]>([]);
  const [blogData, setBlogData] = useState<BlogData>();
  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const user = useTypedSelector((state: RootState) => state.user);
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const getBlogData = useCallback(() => {
    axios
      .get(`${process.env.API_URL}/users/${user.id}/blogs/${id}`)
      .then((response) => {
        console.log(response);
        const data: BlogData = response.data[0];
        setBlogData(response.data[0]);
        if (!data || data.creatorId !== user.id) {
          navigate("/dashboard");
          return;
        }
        setBlogLoading(false);
      })
      .catch((e) => {});
  }, [id, user.id]);

  const editBlogHandler = function (
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
      .patch(
        `${process.env.API_URL}/users/${user.id}/blogs/${id}`,
        { blog },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        console.log("Blog edited successfully");
        navigate(`/blog/${blogData?.id}`);
      });
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      getBlogData();
      setBlogLoading(false);
    }
  }, [getBlogData, user.isLoggedIn]);
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        {!blogLoading ? (
          <div className="d-flex flex-column justify-content-center pt-5 ">
            <div className="fs-1 fw-bold d-block text-center ">Edit blog</div>
            <hr className="border border-dark opacity-50" />
            <form onSubmit={editBlogHandler} className="text-center">
              <div className="form-group py-3">
                <label className="form-check-label py-3 d-flex flex-column justify-content-center align-items-center fs-2 text-center">
                  Blog Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  ref={titleRef}
                  placeholder={blogData?.title}
                />
              </div>
              <div className="form-group py-2">
                <label className="form-check-label py-3 d-flex flex-column justify-content-center align-items-center fs-2 text-center">
                  Blog Text
                </label>
                <textarea
                  className="form-control py-3"
                  rows={3}
                  ref={bodyRef}
                  placeholder={blogData?.body}
                ></textarea>
                <div>
                  <label className="form-check-label py-3 d-flex flex-column justify-content-center align-items-center fs-2 text-center">
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
              </div>
              <div className="py-3 d-flex flex-column align-items-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Submit
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>&nbsp;</div>
        )}
      </div>
    </Fragment>
  );
}
export default EditBlog;
