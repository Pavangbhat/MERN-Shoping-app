import React from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    loading: false,
    error: "",
    didRedirect: false,
  });
  const { email, password, loading, didRedirect, error } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, didRedirect: false, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.Error) {
          setValues({
            ...values,
            error: data.Error,
            loading: false,
            didRedirect: false,
          });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              error: false,
              didRedirect: true,
              loading: false,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isloading = () => {
    return loading && <p style={{ color: "white" }}>loading</p>;
  };

  const onErrorAtsignin = () => {
    return (
      <div
        className="container alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h3>{error}</h3>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 0) {
        return <Redirect to="/user/dashboard" />;
      } else {
        return <Redirect to="/admin/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInform = () => (
    <div className="row ">
      <div className="col-md-6 off-set-sm-3 ">
        <form>
          <div className="form-group">
            <label className="text-white" style={{ fontSize: "20px" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              value={email}
              onChange={handleChange("email")}
              style={{ fontSize: "15px" }}
            />
          </div>
          <div className="form-group">
            <label style={{ fontSize: "20px", color: "white" }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Your Password"
              value={password}
              onChange={handleChange("password")}
              style={{ fontSize: "15px" }}
            />
          </div>
          <div>
            <button
              className="btn btn-success btn-block"
              onClick={handleSubmit}
              style={{ fontSize: "20px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <Base title="Sign In" description="Page To Sign In User!">
      {isloading()}
      {onErrorAtsignin()}
      {signInform()}
      {performRedirect()}
      {/* <p style={{ color: "white" }}>{JSON.stringify(props)}</p> */}
    </Base>
  );
};

export default Signin;
