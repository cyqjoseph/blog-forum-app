import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useCallback, useState, Fragment } from "react";
import { BlogData, CommentData } from "../interfaces";
import CreateComment from "../components/CreateComment";
import Comment from "../models/Comment";
import { calculateElapsed, overrideCSS } from "../utils/Helper";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Header from "../components/Header";
import RingLoader from "react-spinners/RingLoader";

function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [blogData, setBlogData] = useState<BlogData>();
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [blogLoading, setBlogLoading] = useState<boolean>(true);
  const [commentLoading, setCommentLoading] = useState<boolean>(true);
  const [noCommentData, setNoCommentData] = useState<boolean>(false);
  const user = useTypedSelector((state: RootState) => state.user);

  /* 
    Get particular blog data to the page, if a user navigates to a blog which does not exist, redirect to dashboard
  */
  const getBlogData = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${user.id}/blogs/${id}`)
      .then((response) => {
        setBlogData(response.data[0]);
        setBlogLoading(false);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        navigate("/dashboard");
        // 404 page could be shown instead of redirection
      });
  }, [id, user.id, navigate]);

  /* 
    Get particular comment data to the blog
  */
  const getCommentData = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/users/${user.id}/blogs/${id}/comments`
      )
      .then((response) => {
        if (response.data.length === 0) {
          setNoCommentData(true);
        } else {
          setCommentData(response.data);
          setCommentLoading(false);
          setNoCommentData(false);
        }
      })
      .catch((e) => {});
  }, [id, user.id]);

  // Handler function to delete a blog
  const deleteBlogHandler = function () {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/users/${user.id}/blogs/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };
  // Component mounting, render both blog and comment
  useEffect(() => {
    setBlogLoading(true);
    setCommentLoading(true);
    if (user.isLoggedIn) {
      getBlogData();
      getCommentData();
    }
  }, [user, id, getBlogData, getCommentData]);
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Delete Blog
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                All blog data will be permanently removed!
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deleteBlogHandler}
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <RingLoader
          color={"#4cad50"}
          loading={loading}
          cssOverride={overrideCSS}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
          className="mt-5"
        />
        {!blogLoading && (
          <div className="py-2">
            <div className="py-2 ">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/dashboard")}
              >
                &lsaquo; Back
              </button>
            </div>
            <div className="card border border-dark">
              <h4 className="card-header display-8 py-4 d-flex justify-content-around align-items-center">
                <div className="fs-6">
                  {calculateElapsed(blogData!.created_at)}
                </div>
                <div>
                  {blogData!.title} -
                  <span className="text-primary"> @{blogData!.creator}</span>
                </div>
                {user.id === blogData?.user_id ? (
                  <ul className="list-inline m-0">
                    <li className="list-inline-item">
                      <button
                        className="btn btn-warning btn-sm rounded-2"
                        type="button"
                        onClick={() => {
                          navigate(`/blog/${id}/edit-blog`);
                        }}
                      >
                        <FaRegEdit />
                      </button>
                    </li>
                    <li className="list-inline-item">
                      <button
                        className="btn btn-danger btn-sm rounded-2"
                        type="button"
                        onClick={() => {}}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </li>
                  </ul>
                ) : (
                  <div>&nbsp;</div>
                )}
              </h4>

              <h4 className="text-center py-3 mx-5">{blogData!.body}</h4>
              <div className="lead d-flex justify-content-around pb-2">
                <div className="d-flex">
                  {blogData?.tag_list.map((ele) => (
                    <div className="mx-1">
                      <button className="btn btn-sm btn-light border border-dark">
                        #{ele}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="py-2 my-2 border rounded">
              <CreateComment blogData={blogData} />
            </div>
            <div>
              {noCommentData && (
                <div className="alert alert-danger mt-5" role="alert">
                  <h4 className="alert-heading text-center py-2">
                    Nothing to see here...
                  </h4>
                  <hr />

                  <p className="text-center fs-5">Be the first to comment!</p>
                </div>
              )}
              {!commentLoading &&
                Comment.parseData(commentData)
                  .reverse()
                  .map((ele) => ele.render())}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default BlogPage;
