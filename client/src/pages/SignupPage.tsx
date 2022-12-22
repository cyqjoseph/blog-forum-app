import axios from "axios";
import { Fragment, useRef, useState, useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";

function Signup(): JSX.Element {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser, addError } = useActions();
  // const errors = useTypedSelector((state: RootState) => state.errors);
  const user = useTypedSelector((state: RootState) => state.user);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const confirmPassword = confirmInputRef.current!.value;
    if (password !== confirmPassword) {
      addError(["Password must match confirmation password"]);
      return;
    }
    const user = { username, email, password };
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users`,
        { user },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          const id = response.data.user.id;
          loginUser({ username, id });
          navigate("/dashboard");
          setError("");
        } else {
          console.log(response.data);
          setError(response.data.errors[0]);
          // addError(response.data.errors);
        }
      })
      .catch((e) => {});
  };
  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/dashboard");
    }
  }, [user.isLoggedIn, navigate]);
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        <div className="d-flex flex-column justify-content-center  pt-5">
          <div className="fs-1 fw-bold d-block text-center pb-3">Sign up</div>
          <hr className="border border-dark opacity-50 w-50 mx-auto mb-5" />
          <form
            className="mx-auto card py-3 px-5 rounded"
            onSubmit={submitHandler}
          >
            <div className="form-group py-2 ">
              <label className="form-check-label py-1 d-flex flex-column justify-content-center align-items-center fs-5">
                Name
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
              <label className="form-check-label py-1 d-flex flex-column justify-content-center align-items-center fs-5">
                Create Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                ref={passwordInputRef}
              />
            </div>
            <div className="form-group py-3">
              <label className="form-check-label py-1 d-flex flex-column justify-content-center align-items-center fs-5">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                required
                ref={confirmInputRef}
              />
            </div>
            <div className="py-5 d-flex justify-content-between d-flex flex-column justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit
              </button>
            </div>
          </form>
          <div className="mx-auto py-4">
            <button
              type="button"
              className="btn btn-secondary py-2"
              onClick={() => navigate("/login")}
            >
              Login with an existing account
            </button>
          </div>
        </div>
        {error && (
          <div className="pt-5">
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
export default Signup;
