import React, { useState, useEffect } from "react";
import Base from "./Base";
import CardForProduct from "./CardForProduct";
import { getAllProducts } from "./helper/coreapicalls";
import { addToCart } from "./helper/addToCart";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const getProducts = () => {
    getAllProducts()
      .then((data) => {
        console.log(data);

        if (data.Error) {
          setError(data.Error);
        } else {
          setproducts(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCart = (product) => {
    addToCart(product, () => {
      setRedirect(true);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Base
      title="Welcome To Our Store"
      description="A Place Where Best Items Are Sold"
    >
      {redirect ? <Redirect to="/cart" /> : null}
      <div className="row text-center font-weight-bold">
        {products.map((product, index) => (
          <CardForProduct
            product={product}
            key={index}
            isCartPage={false}
            addCart={addCart}
          />
        ))}
      </div>
    </Base>
  );
};

export default Home;
