import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import AdminDashBoard from "./user/AdminDashBoard";
import UserDashBoard from "./user/UserDashBoard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageCategory from "./admin/ManageCategory";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import Signout from "./user/Signout";
import Orders from "./admin/Orders";
import MangeOrders from "./admin/MangeOrders";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        <Route path="/signout" exact component={Signout} />

        <AdminRoute path="/admin/dashboard">
          <AdminDashBoard />
        </AdminRoute>

        <AdminRoute path="/admin/create/category">
          <AddCategory />
        </AdminRoute>

        <AdminRoute path="/admin/create/product">
          <AddProduct />
        </AdminRoute>

        <AdminRoute path="/admin/manage/categories">
          <ManageCategory />
        </AdminRoute>

        <AdminRoute path="/admin/manage/products">
          <ManageProducts />
        </AdminRoute>

        <AdminRoute path="/admin/product/update/:productId">
          <UpdateProduct />
        </AdminRoute>

        <AdminRoute path="/category/update/:categoryId/:userId">
          <UpdateCategory />
        </AdminRoute>

        <AdminRoute path="/admin/orders">
          <Orders />
        </AdminRoute>

        <AdminRoute path="/admin/mange/orders">
          <MangeOrders />
        </AdminRoute>

        <PrivateRoute path="/user/dashboard">
          <UserDashBoard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
