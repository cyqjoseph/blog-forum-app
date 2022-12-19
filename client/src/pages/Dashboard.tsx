import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Blog from "../models/Blog";
import { Link } from "react-router-dom";
function Dashboard() {
  const user = useTypedSelector((state: RootState) => state.user);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const getBlogs = function () {
    axios
      .get(`http://localhost:3001/all_blogs`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);

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
      .get(`http://localhost:3001/all_blogs/${tag}`, {
        withCredentials: true,
      })
      .then((response) => setBlogs(Blog.parseBlogs(response.data)))
      .catch((e) => {});
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      getBlogs();
    }
  }, [user.isLoggedIn]);
  return (
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
      {Blog.renderAll(blogs)}
    </div>
  );
}

export default Dashboard;
