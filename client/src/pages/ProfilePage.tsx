import { Link } from "react-router-dom";
import { useState, useRef, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { BlogData, UserData } from "../interfaces";
import { getFormattedDate } from "../utils/Helper";
import Blog from "../models/Blog";
import Header from "../components/Header";
function ProfilePage() {
  const user = useTypedSelector((state: RootState) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userResponse, setUserRepsonse] = useState<UserData>();
  const [blogsResponse, setBlogsResponse] = useState<Blog[]>();
  const [noBlogs, setNoBlogs] = useState<boolean>(false);
  const getUser = function () {
    axios
      .get(`http://localhost:3001/users/${id}`)
      .then((response) => {
        setUserRepsonse(response.data.user);
      })
      .catch((e) => {
        // User Not found
      });
  };

  const getUserBlogs = function () {
    axios
      .get(`http://localhost:3001/users/${id}/blogs`)
      .then((response) => {
        const blogs = Blog.parseBlogs(response.data);
        if (blogs.length === 0) {
          setNoBlogs(true);
        }
        console.log(blogs);
        setBlogsResponse(blogs);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    getUser();
    getUserBlogs();
  }, []);

  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-70">
        {userResponse && (
          <div className="d-flex flex-column justify-content-around  pt-5">
            <div className="d-flex justify-content-around">
              <div className="fs-1 fw-bold text-center ">Profile</div>
              {userResponse.id === user.id && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate(`/edit-profile/${id}`)}
                >
                  Edit profile
                </button>
              )}
            </div>
            <hr className="border border-dark opacity-50" />
            <div className="text-center">
              <div className=" py-2 ">
                <label className="py-1 fs-2">
                  Username:&nbsp;
                  <span className="text-primary fs-3">
                    @{userResponse?.username}
                  </span>
                </label>
              </div>
              <div className=" py-2">
                <label className="py-1 fs-2">
                  Joined:&nbsp;
                  <span className="fs-3">
                    {getFormattedDate(userResponse.created_at!)}
                  </span>
                </label>
              </div>
            </div>
            <hr className="border border-dark opacity-50" />
            {blogsResponse && Blog.renderAll(blogsResponse)}
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default ProfilePage;
