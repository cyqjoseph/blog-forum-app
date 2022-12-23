import "./app.css";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { LoginData, AuthResponse } from "./interfaces";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/DashboardPage";
import Login from "./pages/LoginPage";
import { useActions } from "./hooks/use-actions";
import { useTypedSelector } from "./hooks/use-typed-selector";
import { RootState } from "./state";
import Signup from "./pages/SignupPage";
import { logoutUser } from "./state/action-creators";
import CreateBlog from "./components/CreateBlog";
import BlogPage from "./pages/BlogPage";
import EditBlog from "./components/EditBlog";
import ProfilePage from "./pages/ProfilePage";
import EditUserPage from "./components/EditUserPage";
function App() {
  const data = useTypedSelector((state: RootState) => state);
  const { loginUser } = useActions();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  // Function to modify application state depending on whether there is a user logged in
  const loginStatus = useCallback(
    () =>
      function () {
        axios
          .get<LoginData>("http://localhost:3001/logged_in", {
            withCredentials: true,
          })
          .then((response: AuthResponse) => {
            const { data } = response;
            if (data.logged_in) {
              loginUser({
                username: data.user!.username,
                id: data.user!.id,
              });
              setIsLoggedIn(true);
            }
            if (data.logged_out || data.logged_in === false) {
              logoutUser();
              setIsLoggedIn(false);
            }
          })
          .catch((error) => console.log("api errors:", error));
      },
    [loginUser]
  );
  useEffect(() => {
    setIsLoggedIn(data.user.isLoggedIn);
    //fix accessing dashboard when not logged in
    // if (!isLoggedIn) {
    //   navigate("/login");
    // } else {
    //   navigate("/dashboard");
    // }
  }, [isLoggedIn, data, navigate]);
  useEffect(() => loginStatus(), [loginStatus]);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="dashboard/*" element={<Dashboard />}></Route>
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="create-blog" element={<CreateBlog />} />
        <Route path="edit-profile/:id" element={<EditUserPage />} />
        <Route path="blog/:id" element={<BlogPage />} />
        <Route path="blog/:id/edit-blog" element={<EditBlog />} />
        <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
