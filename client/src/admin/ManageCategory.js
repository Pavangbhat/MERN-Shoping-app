import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllCategory, deleteCategory } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const { token, user } = isAuthenticated();

const ManageCategory = () => {
  const [values, setValues] = useState({
    catrgories: [],
    error: false,
  });
  const { catrgories, error } = values;

  const preload = () => {
    getAllCategory().then((data) => {
      setValues({ ...values, catrgories: data });
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteACategory = (categoryId, userId, token) => {
    deleteCategory(categoryId, userId, token).then((data) => {
      if (data.Error) {
        setValues({ ...values, error: data.Error });
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <Base title="Manage Categories" description="Manage Your Categories Here">
        <div className="row">
          <h1 className="col-12 text-white text-center">Your Categories </h1>
        </div>
        <div className="container">
          {catrgories.map((item, index) => (
            <div key={index} className="row text-center text-white py-3">
              <h1 className="col-12 col-sm-4 ">{item.name}</h1>

              <div className="col-12 col-sm-4 mb-2">
                <Link
                  className="btn btn-lg btn-success"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  to={`/category/update/${item._id}/${user._id}`}
                >
                  Update
                </Link>
              </div>

              <div className="col-12 col-sm-4 mb-2">
                <h1
                  className="btn btn-lg btn-danger "
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  onClick={() => {
                    console.log(item._id, user._id, token);
                    deleteACategory(item._id, user._id, token);
                  }}
                >
                  Delete
                </h1>
              </div>
            </div>
          ))}
        </div>
      </Base>
    </div>
  );
};

export default ManageCategory;
