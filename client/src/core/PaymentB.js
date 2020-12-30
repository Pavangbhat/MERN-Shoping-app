import React, { useState, useEffect } from "react";
import { emptyCart } from "./helper/addToCart";
import { isAuthenticated } from "../auth/helper";
import { createOrder } from "./helper/orderHelper";
import { getMeToken, processPayment } from "./helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react";

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

const PaymentB = ({ products }) => {
  const [info, setInfo] = useState({
    success: false,
    loading: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const [shippingInfo, setShippingInfo] = useState({
    fname: "",
    lname: "",
    address: "",
    landmark: "",
    postalCode: "",
    isfilled: false,
  });
  const {
    fname,
    lname,
    address,
    landmark,
    postalCode,
    isfilled,
  } = shippingInfo;

  const [message, setmessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((info) => {
      if (info.Error) {
        setInfo({ ...info, success: false, error: info.Error });
      } else {
        setInfo({
          ...info,
          error: false,
          success: true,
          clientToken: info.clientToken,
        });
      }
    });
  };

  const buy = async () => {
    // Send the nonce to your server

    setInfo({ ...info, error: "", success: false, loading: true });

    const { nonce } = await info.instance.requestPaymentMethod();
    let nonceFromTheClient = nonce;
    let amountFromTheClient = getAmount();
    await processPayment(
      userId,
      token,
      nonceFromTheClient,
      amountFromTheClient,
      shippingInfo
    )
      .then((result) => {
        console.log("result:", result);
        if (result.Error) {
          setInfo({
            ...info,
            error: result.Error,
            success: false,
            loading: false,
          });
        } else {
          setInfo({ ...info, success: true });
          console.log(result.transaction.id);
          let order = {
            products: products,
            transcation_id: result.transaction.id,
            amount: amountFromTheClient,
            status: "Received",
            address: {
              firstName: result.transaction.shipping.firstName,
              lastName: result.transaction.shipping.lastName,
              streetAddress: result.transaction.shipping.streetAddress,
              locality: result.transaction.shipping.locality,
              postalCode: result.transaction.shipping.postalCode,
            },
          };
          createOrder(userId, token, order).then((data) => {
            console.log(data);
            if (data.Error) {
              console.log("DATA error:", data.Error);
            } else {
              // console.log("Data:", data);
            }
            emptyCart(() => {
              console.log("Cart Empty");
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  const shippingUI = () => {
    return (
      <>
        <form
          className="p-5"
          style={{ borderRadius: "10px", backgroundColor: "#3a4f5a" }}
        >
          <div>
            <div className="form-group">
              <div className="input-group-prepend ">
                <span
                  className="input-group-text bg-success text-white"
                  style={{ fontSize: "20px" }}
                >
                  First name
                </span>
              </div>
              <input
                type="name"
                className="form-control"
                style={{ fontSize: "20px" }}
                placeholder="Enter your first name"
                value={fname}
                onChange={(e) => {
                  setShippingInfo({ ...shippingInfo, fname: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="pt-3">
            <div className="form-group">
              <div className="input-group-prepend ">
                <span
                  className="input-group-text bg-success text-white"
                  style={{ fontSize: "20px" }}
                >
                  Last Name
                </span>
              </div>
              <input
                type="name"
                className="form-control"
                style={{ fontSize: "20px" }}
                placeholder="Enter your last name"
                value={lname}
                onChange={(e) => {
                  setShippingInfo({ ...shippingInfo, lname: e.target.value });
                }}
              />
            </div>
          </div>
          <div className=" pt-3">
            <div className="form-group">
              <div className="input-group-prepend ">
                <span
                  className="input-group-text bg-success text-white"
                  style={{ fontSize: "20px" }}
                >
                  Street Address
                </span>
              </div>
              <input
                type="name"
                className="form-control"
                style={{ fontSize: "20px" }}
                placeholder="Enter your Street Address"
                value={address}
                onChange={(e) => {
                  setShippingInfo({ ...shippingInfo, address: e.target.value });
                }}
              />
            </div>
          </div>
          <div className=" pt-3">
            <div className="form-group">
              <div className="input-group-prepend ">
                <span
                  className="input-group-text bg-success text-white"
                  style={{ fontSize: "20px" }}
                >
                  Landmark
                </span>
              </div>
              <input
                type="name"
                className="form-control"
                style={{ fontSize: "20px" }}
                placeholder="Nearest landmark eg:bank"
                value={landmark}
                onChange={(e) => {
                  setShippingInfo({
                    ...shippingInfo,
                    landmark: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className=" pt-3">
            <div className="form-group">
              <div className="input-group-prepend ">
                <span
                  className="input-group-text bg-success text-white"
                  style={{ fontSize: "20px" }}
                >
                  Postal Code
                </span>
              </div>
              <input
                type="name"
                className="form-control"
                style={{ fontSize: "20px" }}
                placeholder="Your Postal Code"
                value={postalCode}
                onChange={(e) => {
                  setShippingInfo({
                    ...shippingInfo,
                    postalCode: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div
            onClick={(e) => {
              e.preventDefault();
              isAnyFieldEmpty();
            }}
          >
            <h1
              className="btn btn-success mt-3 p-2"
              style={{ fontSize: "20px" }}
            >
              Processed Payment
            </h1>
          </div>
        </form>
      </>
    );
  };
  const isAnyFieldEmpty = () => {
    if (
      fname === "" ||
      lname === "" ||
      address === "" ||
      landmark === "" ||
      postalCode === ""
    ) {
      setShippingInfo({ ...shippingInfo, isfilled: false });
    } else {
      setShippingInfo({ ...shippingInfo, isfilled: true });
    }
  };
  const showDropInUi = () => {
    return (
      <>
        <DropIn
          options={{ authorization: info.clientToken }}
          onInstance={(instance) => (info.instance = instance)}
        />
        <button className="btn btn-block btn-success btn-lg" onClick={buy}>
          <h3>Buy</h3>
        </button>
      </>
    );
  };
  useEffect(() => {
    if (!isAuthenticated()) {
      setmessage("Please signin");
    } else {
      if (products.length > 0) {
        setmessage("Please add items in cart");
      } else {
        setmessage("");
      }
    }
  }, []);

  useEffect(() => {
    getToken(userId, token);
  }, []);
  // console.log(shippingInfo);
  return (
    <div className="mt-5">
      <h1
        style={{
          color: "#2C3335",
          fontFamily: "Indie Flower",
          fontWeight: "bold",
        }}
      >
        Your Bill is {getAmount()} $
      </h1>
      {isAuthenticated() && products.length > 0 && !isfilled ? (
        <>{shippingUI()}</>
      ) : (
        <h1
          style={{
            color: "#2C3335",
            fontFamily: "Indie Flower",
            fontWeight: "bold",
          }}
        >
          {message}
        </h1>
      )}

      {isAuthenticated() && isfilled ? <>{showDropInUi()}</> : <div></div>}
    </div>
  );
};

export default PaymentB;
