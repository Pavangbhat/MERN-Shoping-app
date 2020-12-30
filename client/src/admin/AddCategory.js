import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const { user, token } = isAuthenticated();

const goBackButton = () => {
  return (
    <Link
      className="btn btn-dark btn-sm mt-2"
      style={{ fontSize: "15px" }}
      to="/admin/dashboard"
    >
      Go back
    </Link>
  );
};

const AddCategory = () => {
  const [categoryName, setCategoryName] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(false);
    setSuccess("");
    createCategory(user._id, token, categoryName).then((data) => {
      if (data.Error) {
        setError(data.Error);
      } else {
        setCategoryName("");
        setSuccess(true);
      }
    });
  };

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-white" style={{ fontSize: "20px" }}>
            Create Category
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ex.SummerCollection"
            style={{ fontSize: "15px" }}
            value={categoryName}
            autoFocus
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>

        <button
          className="btn btn-success btn-sm font-weight-bold"
          style={{ fontSize: "15px" }}
          onClick={handleSubmit}
        >
          Add Category
        </button>
      </form>
    );
  };
  const onSuccessfullCreating = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        <h3>Category Created successfully!!</h3>
      </div>
    );
  };

  const onErrorInCreating = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h3>{error}</h3>
      </div>
    );
  };

  return (
    <Base title="Create Category Here">
      <div className="row rounded p-4">
        <div className="col-md-8 offset-md-2 bg-danger p-3">
          {onSuccessfullCreating()}
          {onErrorInCreating()}
          {categoryForm()}
          {goBackButton()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
