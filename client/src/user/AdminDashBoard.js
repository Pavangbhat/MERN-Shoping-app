import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const adminLeftSide = () => {
  return (
    <div className="card">
      <h2 className="card-header font-weight-bold text-white text-center bg-dark">
        Admin Navigation
      </h2>

      <div className="card-body">
        <ul className="list-group">
          <li
            className="list-group-item font-weight-bold text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/create/category" className="text-dark">
              <h1>Create Category</h1>
            </Link>
          </li>
          <li
            className="list-group-item font-weight-bold text-info text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/manage/categories" className="text-dark">
              <h1>Manage Categories</h1>
            </Link>
          </li>
          <li
            className="list-group-item font-weight-bold text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/create/product" className="text-dark">
              <h1>Create Product</h1>
            </Link>
          </li>
          <li
            className="list-group-item font-weight-bold text-info text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/manage/products" className="text-dark">
              <h1>Manage Products</h1>
            </Link>
          </li>
          <li
            className="list-group-item font-weight-bold text-info text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/orders" className="text-dark">
              <h1>Show Orders</h1>
            </Link>
          </li>
          <li
            className="list-group-item font-weight-bold text-info text-center"
            style={{ fontSize: "15px" }}
          >
            <Link to="/admin/mange/orders" className="text-dark">
              <h1>Manage Orders</h1>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
const adminRightSide = ({ user }) => (
  <div className="card">
    <h2 className="card-header font-weight-bold text-white text-center bg-dark">
      Admin Information
    </h2>
    <div className="card-body">
      <ul className="list-group">
        <li className="list-group-item">
          <h1>
            <span
              className="badge badge-success"
              style={{ marginRight: "5px" }}
            >
              Name
            </span>
            {user.name}
          </h1>
        </li>
        <li className="list-group-item">
          <h1>
            <span
              className="badge badge-success"
              style={{ marginRight: "5px" }}
            >
              Email
            </span>
            {user.email}
          </h1>
        </li>
      </ul>
    </div>
  </div>
);
const AdminDashBoard = () => {
  const { user } = isAuthenticated();

  return (
    <Base title="AdminDashBoard">
      <div className="row p-4">
        <div className="col-md-4">{adminLeftSide()}</div>
        {isAuthenticated() && (
          <div className="col-md-8">{adminRightSide({ user })}</div>
        )}
      </div>
    </Base>
  );
};

export default AdminDashBoard;
