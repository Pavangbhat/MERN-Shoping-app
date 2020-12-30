import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getAllorders } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const { token, user } = isAuthenticated();

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllorders(user._id, token).then((data) => {
      setOrders(data);
    });
  }, []);
  console.log(orders);
  const orderTable = () => (
    <table className="table table-responsive table-striped">
      <thead className="thead-dark">
        <tr>
          <th>
            <h1>#</h1>
          </th>
          <th>
            <h1>Name</h1>
          </th>
          <th>
            <h1>Products</h1>
          </th>
          <th>
            <h1>Amount</h1>
          </th>
          <th>
            <h1>orderStatus</h1>
          </th>
          <th>
            <h1>transcation_id</h1>
          </th>
        </tr>
      </thead>

      <tbody>
        {orders.map((order, index) => (
          <tr>
            <th scope="row">
              <h1 className="font-weight-bold">{index + 1}</h1>
            </th>
            <td>
              <h1>{order.user.name}</h1>
            </td>
            <td>
              <h1>
                {order.products.map((product) => {
                  return product.name + ",";
                })}
              </h1>
            </td>
            <td>
              <h1>{order.amount}</h1>
            </td>
            <td>
              <h1>{order.status}</h1>
            </td>
            <td>
              <h1>{order.transcation_id}</h1>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const goBackButton = () => {
    return (
      <Link className="btn btn-dark btn-sm mt-2 p-3" to="/admin/dashboard">
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>Go back</h3>
      </Link>
    );
  };
  return (
    <Base title="All Orders Dear Admin" description="See Your Order Here">
      <div className="row mt-3">
        <div className="col-sm-12 text-center">{orderTable()}</div>
      </div>
      <div className="row">
        <div className="col-sm-12">{goBackButton()}</div>
      </div>
    </Base>
  );
};

export default Orders;
