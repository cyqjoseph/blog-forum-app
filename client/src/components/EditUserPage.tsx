import { useTypedSelector } from "../hooks/use-typed-selector";
import { RootState } from "../state";
import axios from "axios";
import { useRef, useCallback, useState, useEffect, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserData } from "../interfaces";

import { useActions } from "../hooks/use-actions";
import Header from "./Header";
function EditUserPage() {
  const [error, setError] = useState("");
  const { addError } = useActions();
  const navigate = useNavigate();
  const { id } = useParams();
  const [userResponse, setUserRepsonse] = useState<UserData>();
  const userState = useTypedSelector((state: RootState) => state.user);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const confirmInputRef = useRef<HTMLInputElement>(null);
  const getUser = useCallback(() => {
    axios
      .get(`${process.env.API_URL}/users/${id}`)
      .then((response) => {
        console.log(response);
        if (id !== userState.id?.toString()) {
          navigate("/dashboard");
        }
        setUserRepsonse(response.data.user);
      })
      .catch((e) => {
        // setError(response.data.errors[0]);
      });
  }, [id, navigate, userState.id]);

  const submitHandler = function (
    event: React.SyntheticEvent<HTMLFormElement>
  ): void {
    event.preventDefault();
    const username = usernameInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    const confirmPassword = confirmInputRef.current!.value;
    if (password !== confirmPassword) {
      return;
    }
    const user = { username, password };
    axios
      .patch(
        `${process.env.API_URL}/users/${userState.id}`,
        { user },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/dashboard");
        setError("");
      })
      .catch((e) => {});
  };
  useEffect(() => {
    getUser();
  }, [getUser]);
  return (
    <Fragment>
      <Header />
      <div className="container h-100 w-50">
        {userResponse ? (
          <div>
            <div className="fs-1 fw-bold d-block text-center pt-5">
              Edit Profile
            </div>
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
                  Enter Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  ref={passwordInputRef}
                />
              </div>
              <div className="form-group py-3">
                <label className="form-check-label py-2 d-flex flex-column justify-content-center align-items-center fs-4">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  required
                  ref={confirmInputRef}
                />
              </div>
              <div className="py-5 d-flex flex-column justify-content-center align-items-center">
                <button type="submit" className="btn btn-primary px-5">
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
export default EditUserPage;
