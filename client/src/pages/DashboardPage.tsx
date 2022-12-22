import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useState, useEffect, useRef, Fragment } from "react";
import Blog from "../models/Blog";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
function DashboardPage() {
  const navigate = useNavigate();
  const user = useTypedSelector((state: RootState) => state.user);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [noBlogsData, setNoBlogsData] = useState(false);
  const tagRef = useRef<HTMLInputElement>(null);
  const getBlogs = function () {
    axios
      .get(`${process.env.REACT_APP_API_URL}/all_blogs`, {
        withCredentials: true,
      })
      .then((response) => {
        setBlogs(Blog.parseBlogs(response.data));
      })
      .catch((e) => {});
  };
  const filterByTags = function () {
    if (!tagRef.current) {
      return;
    }
    const tag = tagRef.current.value;
    axios
      .get(`${process.env.REACT_APP_API_URL}/all_blogs/${tag}`, {
        withCredentials: true,
      })
      .then((response) => setBlogs(Blog.parseBlogs(response.data)))
      .catch((e) => {});
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      getBlogs();
      if (blogs.length === 0) {
        setNoBlogsData(true);
      } else {
        setNoBlogsData(false);
      }
    } else {
      navigate("/login");
    }
  }, [user.isLoggedIn, navigate, blogs.length]);
  return (
    <Fragment>
      <Header />
      <div className="container">
        <h1 className="text-center py-4">Discover</h1>
        <hr className="border border-dark opacity-50" />
        <div className="text-center py-2">
          <Link
            className="btn btn-success btn-md "
            to="/create-blog"
            role="button"
          >
            Create a new blog +
          </Link>
        </div>
        <div className="py-3 d-flex justify-content-between">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              #
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search Tags"
              aria-label="Username"
              aria-describedby="basic-addon1"
              ref={tagRef}
            />
          </div>
          <button
            className="input-group-text"
            id="basic-addon1"
            onClick={filterByTags}
          >
            &#128269;
          </button>
        </div>
        {noBlogsData && (
          <div className="alert alert-danger mt-5" role="alert">
            <h4 className="alert-heading text-center py-2">
              Nothing to see here...
            </h4>
            <hr />

            <p className="text-center fs-5">Be the first to post!</p>
          </div>
        )}
        {Blog.renderAll(blogs)}
      </div>
    </Fragment>
  );
}

export default DashboardPage;
