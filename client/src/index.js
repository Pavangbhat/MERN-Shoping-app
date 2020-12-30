import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

const Index = () => {
  return <Routes />;
};

ReactDOM.render(<Index />, document.getElementById("root"));
