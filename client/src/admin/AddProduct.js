import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { getAllCategory, addProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const { token, user } = isAuthenticated();

const AddProduct = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    error: "",
    formData: "",
    loading: false,
    success: false,
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    error,
    success,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value); // ! Read docs here
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, success: false });
    addProduct(user._id, formData, token)
      .then((data) => {
        if (data.Error) {
          setValues({
            ...values,
            error: data.Error,
            success: false,
            loading: false,
          });
        } else {
          setValues({
            name: "",
            photo: "",
            price: "",
            stock: "",
            formData: "",
            loading: false,
            success: true,
            error: false,
          });
        }
      })
      .catch((err) => {
        console.log("error adding product", err);
      });
  };

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

  const createProductForm = () => (
    <form>
      <span className="badge badge-success mb-2" style={{ fontSize: "15px" }}>
        Post photo
      </span>
      <div className="form-group">
        <label className="btn btn-block btn-dark" style={{ fontSize: "15px" }}>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
          style={{ fontSize: "15px" }}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
          style={{ fontSize: "15px" }}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
          style={{ fontSize: "15px" }}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
          style={{ fontSize: "15px" }}
        >
          <option>Select</option>
          {categories &&
            categories.map((item, index) => {
              return (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
          style={{ fontSize: "15px" }}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-info"
        style={{ fontSize: "15px" }}
      >
        Create Product
      </button>
    </form>
  );

  const preload = () => {
    getAllCategory().then((data) => {
      if (data.Error) {
        setValues({ ...values, error: data.Error });
      } else {
        setValues({
          ...values,
          categories: data,
          error: "",
          formData: new FormData(),
        });
      }
    });
  };

  const onError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        <h3>{error}</h3>
      </div>
    );
  };

  const redirectToAdminPage = () => {
    // setTimeout(() => {}, 2000);
    return <Redirect to="/admin/dashboard" />;
  };
  const onSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: success ? "" : "none" }}
      >
        <h3>Category Created successfully!!</h3>

        {success ? redirectToAdminPage() : null}
      </div>
    );
  };

  useEffect(() => {
    preload();
  }, []);

  // setTimeout(() => {

  // }, 5000);

  return (
    <Base title={"Add Your Product Here"}>
      <div className="row rounded p-4">
        <div className="col-md-8 offset-md-2 col-sm-12 bg-danger p-3">
          {onError()}
          {onSuccess()}
          {createProductForm()}
          {goBackButton()}
        </div>
      </div>
    </Base>
  );
};

export default AddProduct;
