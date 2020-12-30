import React, { useState, useEffect } from "react";
import Base from "./Base";
import { cartProducts, removeFromCart } from "./helper/addToCart";
import CardForProduct from "./CardForProduct";
import { Redirect } from "react-router-dom";
import PaymentB from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setProducts(cartProducts());
  }, [refresh]);

  const removeCart = (id) => {
    removeFromCart(id, () => {
      setRefresh(!refresh);
    });
  };

  return (
    <Base title="Your Cart" description="Checkout Your Products">
      <div className="row text-center">
        <div className="col-sm-12 col-md-12 col-lg-6 p-5">
          {products.length !== 0 ? (
            <h1
              style={{
                color: "#2C3335",
                fontFamily: "Indie Flower",
                fontWeight: "bold",
              }}
            >
              Your Cart
            </h1>
          ) : (
            <h1
              style={{
                color: "#2C3335",
                fontFamily: "Indie Flower",
                fontWeight: "bold",
              }}
            >
              Your Cart Is Empty
            </h1>
          )}
          {products.map((product, index) => (
            <CardForProduct
              product={product}
              key={index}
              isCartPage={true}
              classProps="col-12"
              removeCart={removeCart}
              index={index}
            />
          ))}
        </div>
        <div className="col-sm-12 col-md-12 col-lg-6 text-white p-5">
          <h1
            style={{
              color: "#2C3335",
              fontFamily: "Indie Flower",
              fontWeight: "bold",
            }}
          >
            Check Out
          </h1>
          <PaymentB products={products} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
