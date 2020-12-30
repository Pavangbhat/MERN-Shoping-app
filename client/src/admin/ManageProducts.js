import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall";
import { Link } from "react-router-dom";

const { token, user } = isAuthenticated();

const ManageProducts = () => {
  const [values, setValues] = useState({
    products: [],
    error: false,
  });
  const { products, error } = values;

  const preload = () => {
    getAllProducts().then((data) => {
      if (data.Error) {
        setValues({ ...values, error: data.Error });
      } else {
        setValues({ ...values, products: data });
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const deleteAProduct = (userId, token, productId) => {
    deleteProduct(userId, token, productId).then((data) => {
      if (data.Error) {
        setValues({ ...values, error: data.Error });
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <Base title="Manage Products" description="Manage Your Products Here">
        <div className="row">
          <h1 className="col-12 text-white text-center">Your Products </h1>
        </div>
        <div className="container">
          {products.map((item, index) => (
            <div key={index} className="row text-center text-white py-3">
              <h1 className="col-12 col-sm-4 ">{item.name}</h1>

              <div className="col-12 col-sm-4 mb-2">
                <Link
                  className="btn btn-lg btn-success"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  to={`/admin/product/update/${item._id}`}
                >
                  Update
                </Link>
              </div>

              <div className="col-12 col-sm-4 mb-2">
                <h1
                  className="btn btn-lg btn-danger "
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                  onClick={() => {
                    deleteAProduct(user._id, token, item._id);
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

export default ManageProducts;
