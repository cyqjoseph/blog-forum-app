import axios from "axios";
import Header from "../components/Header";
import { Fragment, useEffect, useRef, useState } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import { useNavigate } from "react-router";
function Login(): JSX.Element {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useActions();
  const userStatus = useTypedSelector((state: RootState) => state.user);
  const isLoggedIn = userStatus.isLoggedIn;
  //const errors = useTypedSelector((state: RootState) => state.errors);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const user = { username, password };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/login`,
        { user },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200 && response.data.logged_in) {
          loginUser({ username, id: response.data.user!.id });
          setError("");
          navigate("/dashboard");
        } else {
          setError(response.data.errors![0]);
        }
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        <div className="d-flex flex-column justify-content-center pt-5 ">
          <div className="fs-1 fw-bold d-block text-center pb-3">Login</div>
          <hr className="border border-dark opacity-50 w-50 mx-auto mb-5" />
          <form
            className="mx-auto card py-5 px-5 rounded"
            onSubmit={submitHandler}
          >
            <div className="form-group py-3">
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-5">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                required
                ref={usernameInputRef}
              />
            </div>

            <div className="form-group py-3">
              <label className="form-check-label py-1 d-flex flex-column justify-content-center align-items-center fs-5">
                Enter Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className="py-3 d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary px-3">
                Submit
              </button>
            </div>
          </form>
          <div className="mx-auto py-4">
            <button
              type="button"
              className="btn btn-secondary py-2"
              onClick={() => navigate("/signup")}
            >
              Create an account
            </button>
          </div>
          {error && (
            <div className="pt-5">
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}
export default Login;
