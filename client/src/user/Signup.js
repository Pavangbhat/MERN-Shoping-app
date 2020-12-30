import React from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });
  const { name, email, password, success, error } = values;

  // console.log(values);

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    signup({ name, email, password })
      .then((data) => {
        if (data.Error) {
          console.log(data);
          setValues({ ...values, error: data.Error, success: false });
        } else {
          setValues({
            ...values,
            error: false,
            success: true,
            name: "",
            email: "",
            password: "",
          });
        }
      })
      .catch((err) => {
        console.log(err, "at signup");
      });
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 off-set-sm-3 ">
          <form>
            <div className="form-group">
              <label style={{ fontSize: "20px", color: "white" }}>Name</label>
              <input
                className="form-control"
                placeholder="Enter Your Name"
                value={name}
                onChange={handleChange("name")}
                style={{ fontSize: "15px" }}
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: "20px", color: "white" }}>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleChange("email")}
                style={{ fontSize: "15px" }}
                placeholder="Enter Your Email"
              />
            </div>
            <div className="form-group">
              <label style={{ fontSize: "20px", color: "white" }}>
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                style={{ fontSize: "15px" }}
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <div>
              <button
                className="btn btn-success btn-block"
                type="submit"
                onClick={handleSubmit}
                style={{ fontSize: "15px" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const onSuccessfullSignup = () => {
    return (
      <div className="row">
        <div
          className="alert alert-success col-md-6 off-set-sm-3"
          style={{ display: success ? "" : "none" }}
        >
          {`Account was Created Successfully `}
          <Link to="/signin">signin Here</Link>
        </div>
      </div>
    );
  };

  const onErrorAtsignup = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <Base title="Sign up" description="Page To Sign up User!">
      {onSuccessfullSignup()}
      {onErrorAtsignup()}
      {signupForm()}
    </Base>
  );
};

export default Signup;
