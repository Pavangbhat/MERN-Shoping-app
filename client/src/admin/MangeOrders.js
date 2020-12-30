import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getAllorders, UpdateStatusOfOrder } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const { token, user } = isAuthenticated();

const MangeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [values, setValues] = useState({
    name: "",
    orderId: "",
    transcation_id: "",
    status: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [currentDropDownValue, setCurrentDropDownValue] = useState("Received");
  const [isDisabled, setIsDisabled] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAllorders(user._id, token).then((data) => {
      setOrders(data);
    });
  }, [refresh]);

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
          <th>
            <h1>Update Status?</h1>
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
            <td>
              <h1
                className="btn btn-success"
                style={{ fontSize: "20px", fontWeight: "bold" }}
                onClick={() => {
                  setValues({
                    ...values,
                    name: order.user.name,
                    orderId: order._id,
                    transcation_id: order.transcation_id,
                    status: order.status,
                  });
                }}
              >
                Update
              </h1>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const UpdateStatusUI = () => {
    const changeValue = (e) => {
      setCurrentDropDownValue(e.currentTarget.textContent);
    };
    const areValues = () => {
      if (values.name) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    };
    useEffect(() => {
      areValues();
    }, [values]);

    return (
      <div className="card bg-dark text-white">
        <div class="card-header">
          <h1>Update Status Here</h1>
        </div>
        <div className="card-body">
          <h1>Name: {values.name}</h1>
          <h1>orderId: {values.orderId}</h1>
          <h1>transcation_id: {values.transcation_id}</h1>
          <h1>status: {values.status}</h1>
        </div>
        <div>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            direction="up"
            disabled={isDisabled}
          >
            <DropdownToggle caret>
              <h1>{currentDropDownValue}</h1>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={changeValue}>
                <h1>Cancelled</h1>
              </DropdownItem>
              <DropdownItem onClick={changeValue}>
                <h1>Shipped</h1>
              </DropdownItem>
              <DropdownItem onClick={changeValue}>
                <h1>Processing</h1>
              </DropdownItem>
              <DropdownItem onClick={changeValue}>
                <h1>Deliverd</h1>
              </DropdownItem>
              <DropdownItem onClick={changeValue}>
                <h1>Received</h1>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <h1
          className="btn btn-success"
          disabled={isDisabled}
          style={{ fontSize: "20px", fontWeight: "bold", marginTop: "5px" }}
          onClick={() => {
            UpdateStatusOfOrder(
              values.orderId,
              user._id,
              token,
              currentDropDownValue
            ).then((data) => {
              if (data.ok == 1) {
                setRefresh(true);
              }
            });
          }}
        >
          Conform Update Status
        </h1>
      </div>
    );
  };

  return (
    <Base title="Manage Orders" description="Update Order Status Here">
      <div className="row mt-3">
        <div className="col-sm-12 text-center">{orderTable()}</div>
        <div className="row">
          <div className="col-sm-12 offset-md-6 text-center text-center">
            {UpdateStatusUI()}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default MangeOrders;
