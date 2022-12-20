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
  const isLoggedIn = useTypedSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  //const errors = useTypedSelector((state: RootState) => state.errors);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const user = { username, email, password };

    axios
      .post("http://localhost:3001/login", { user }, { withCredentials: true })
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

  useEffect(() => {}, [isLoggedIn]);
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        <div className="d-flex flex-column justify-content-center pt-5 ">
          {error === "" ? (
            <div />
          ) : (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <div className="fs-1 fw-bold d-block text-center ">Login</div>
          <hr className="border border-dark opacity-50" />
          <form className="text-center" onSubmit={submitHandler}>
            <div className="form-group py-3">
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-4">
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
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-4">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                required
                ref={emailInputRef}
              />
            </div>
            <div className="form-group py-3">
              <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-4">
                Enter Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className="py-5 d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
          <button
            type="button"
            className="btn btn-secondary py-2 mx-auto"
            onClick={() => navigate("/signup")}
          >
            Create an account
          </button>
        </div>
      </div>
    </Fragment>
  );
}
export default Login;
