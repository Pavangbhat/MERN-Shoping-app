import React, { useState } from "react";

import { Link, withRouter, Redirect, history, NavLink } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";

const activiteTabColor = (history, path) => {
  //console.log("history.location.path:", history.location.path, "path:", path);
  if (history.location.pathname === path) {
    return { color: "red", fontWeight: "bold", fontSize: "15px" };
  } else {
    return { color: "blue", fontWeight: "800", fontSize: "15px" };
  }
};

const NavigationBar = ({ history }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  console.log(isOpen);
  return (
    <Navbar
      className="bg-info p-3 jumbo-gradient m-0"
      style={{ borderRadius: 0, position: "sticky", top: "0px", zIndex: "100" }}
      expand="md"
      light
      // fixed="top"
    >
      <NavbarBrand>
        <NavLink to="/">
          <h1
            style={{
              color: "#2C3335",
              fontSize: "30px",
              fontWeight: "bold",
              fontFamily: "Roboto Mono, monospace",
              fontFamily: "Pacifico , cursive",
            }}
          >
            MyStore
          </h1>
        </NavLink>
      </NavbarBrand>
      <NavbarToggler
        onClick={toggle}
        className="text-white"
        style={{ fontWeight: "bold" }}
      />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto mt-4" navbar>
          <NavItem>
            <NavLink
              to="/"
              exact
              activeStyle={{
                color: "#FFF",
                fontSize: "23px",
              }}
              style={{
                color: "#2B2B52",
                fontSize: "20px",
                fontWeight: "bold",
                marginLeft: "20px",
              }}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              to="/cart"
              exact
              activeStyle={{
                color: "#FFF",
                fontSize: "23px",
              }}
              style={{
                color: "#2B2B52",
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Roboto Mono, monospace",
                marginLeft: "20px",
              }}
            >
              Cart
            </NavLink>
          </NavItem>
          {isAuthenticated() && (
            <NavItem>
              <NavLink
                to="/user/dashboard"
                exact
                activeStyle={{
                  color: "#FFF",
                  fontSize: "23px",
                }}
                style={{
                  color: "#2B2B52",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                  marginLeft: "20px",
                }}
              >
                UserDashboard
              </NavLink>
            </NavItem>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <NavItem>
              <NavLink
                to="/admin/dashboard"
                exact
                activeStyle={{
                  color: "#FFF",
                  fontSize: "23px",
                }}
                style={{
                  color: "#2B2B52",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                  marginLeft: "20px",
                }}
              >
                AdminDashboard
              </NavLink>
            </NavItem>
          )}
          {!isAuthenticated() && (
            <>
              <NavItem>
                <NavLink
                  to="/signin"
                  exact
                  activeStyle={{
                    color: "#FFF",
                    fontSize: "23px",
                  }}
                  style={{
                    color: "#2B2B52",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Roboto Mono, monospace",
                    marginLeft: "20px",
                  }}
                >
                  Signin
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="/signup"
                  exact
                  activeStyle={{
                    color: "#FFF",
                    fontSize: "23px",
                  }}
                  style={{
                    color: "#2B2B52",
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Roboto Mono, monospace",
                    marginLeft: "20px",
                  }}
                >
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}
          {isAuthenticated() && (
            <NavItem>
              <NavLink
                to="/signout"
                exact
                activeStyle={{
                  color: "#FFF",
                  fontSize: "23px",
                }}
                style={{
                  color: "#2B2B52",
                  fontSize: "20px",
                  fontWeight: "bold",
                  fontFamily: "Roboto Mono, monospace",
                  marginLeft: "20px",
                }}
              >
                Signout
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default withRouter(NavigationBar);

// <ul className="nav nav-tabs" style={{ backgroundColor: "#aed2e6" }}>
//   <li className="nav-item">
//     <Link
//       className="nav-link"
//       to="/"
//       style={activiteTabColor(history, "/")}
//     >
//       Home
//     </Link>
//   </li>
//   <li className="nav-item">
//     <Link
//       className="nav-link"
//       to="/cart"
//       style={activiteTabColor(history, "/cart")}
//     >
//       Cart
//     </Link>
//   </li>
//   {isAuthenticated() && (
//     <li className="nav-item">
//       <Link
//         className="nav-link"
//         to="/user/dashboard"
//         style={activiteTabColor(history, "/user/dashboard")}
//       >
//         Dash Board
//       </Link>
//     </li>
//   )}
//   {isAuthenticated() && isAuthenticated().user.role === 1 && (
//     <li className="nav-item">
//       <Link
//         className="nav-link"
//         to="/admin/dashboard"
//         style={activiteTabColor(history, "/admin/dashboard")}
//       >
//         Admin Dash Board
//       </Link>
//     </li>
//   )}
//   {!isAuthenticated() && (
//     <>
//       <li className="nav-item">
//         <Link
//           className="nav-link"
//           to="/signin"
//           style={activiteTabColor(history, "/signin")}
//         >
//           Sign In
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link
//           className="nav-link"
//           to="/signup"
//           style={activiteTabColor(history, "/signup")}
//         >
//           Sign Up
//         </Link>
//       </li>
//     </>
//   )}
//   {isAuthenticated() && (
//     <li className="nav-item">
//       <Link
//         className="nav-link"
//         style={activiteTabColor(history, "/signout")}
//         onClick={() => {
//           signout(() => {
//             history.push("/");
//           });
//         }}
//       >
//         Sign Out
//       </Link>
//     </li>
//   )}
// </ul>
