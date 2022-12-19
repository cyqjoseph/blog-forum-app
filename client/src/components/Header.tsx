import { Fragment, useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useNavigate } from "react-router";
import { useActions } from "../hooks/use-actions";

function Header() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const user = useTypedSelector((state: RootState) => state.user);
  const { logoutUser } = useActions();
  const logoutHandler = function () {
    axios
      .post("http://localhost:3001/logout", user, { withCredentials: true })
      .then((response) => {
        logoutUser();
        navigate("/login");
      });
  };

  useEffect(() => setLoggedIn(user.isLoggedIn), [user]);
  // useEffect(() => console.log(user), [user]);
  return (
    <nav className="navbar bg-dark d-flex navbar-dark text-white">
      <div className="container-fluid d-flex justify-content-around">
        <div className="navbar-brand">ForumNUS</div>
        {loggedIn && (
          <Fragment>
            <div>Welcome {user.username}</div>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle text-white"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">Profile</button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logoutHandler}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </Fragment>
        )}
      </div>
    </nav>
  );
}

export default Header;
