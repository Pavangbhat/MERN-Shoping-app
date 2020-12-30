import React, { useState } from "react";
import { API } from "../backend";

const CardForProduct = ({
  product,
  index,
  isCartPage = false,
  addCart,
  classProps = "col-sm-6 col-md-4 col-lg-3",
  removeCart,
}) => {
  return (
    <div className={classProps}>
      <div
        className="card mt-3"
        style={{
          backgroundColor: "#EAF0F1",
          borderRadius: "10px",
        }}
      >
        <img
          className="card-img-top"
          style={{ borderRadius: "10px" }}
          src={`${API}/product/getProduct/${product._id}/photo`}
          alt={`${product.name}`}
        />
        <div className="card-body">
          <h2
            className="card-title text-info"
            style={{ fontFamily: "Roboto", fontWeight: "bold" }}
          >
            {product.name}
          </h2>
          <h2 className="card-text" style={{ fontFamily: "" }}>
            {product.description}
          </h2>
          <h2
            className="card-text text-success"
            style={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            $ {product.price}
          </h2>
          {isCartPage ? (
            <div
              className="btn btn-danger btn-lg ml-2 mt-2"
              onClick={() => {
                removeCart(index);
              }}
            >
              <h4>Remove From Cart</h4>
            </div>
          ) : (
            <>
              {product.stock > 0 ? (
                <div
                  className="btn btn-primary btn-lg"
                  style={{ borderRadius: 3 }}
                  onClick={() => {
                    addCart(product);
                  }}
                >
                  <h2 style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                    Add to Cart
                  </h2>
                </div>
              ) : (
                <>
                  <h2
                    className="text-danger"
                    style={{ fontFamily: "Roboto", fontWeight: "bold" }}
                  >
                    Out of Stock{" "}
                  </h2>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardForProduct;
