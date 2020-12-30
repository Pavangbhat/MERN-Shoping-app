import React from "react";
import NavigationBar from "./NavigationBar";

const Base = ({
  title = "My title",
  description = "my description",
  children,
}) => {
  return (
    <div>
      <NavigationBar />
      <div
        className="jumbotron-fluid jumbo-gradient p-5"
        style={{ height: "200px" }}
      >
        <h1
          className="text-center text-light font-weight-bold font-italic"
          style={{ fontSize: "40px", fontFamily: "Chilanka, cursive" }}
        >
          {title}
        </h1>
        <h3
          className="text-center font-weight-bold font-italic lead"
          style={{
            fontSize: "25px",
            fontFamily: "Indie Flower",
            color: "#EAF0F1",
          }}
        >
          {description}
        </h3>
      </div>
      <div className="container mb-4 mt-4">{children}</div>
      {/* footer */}
      <div
        className="jumbotron-fluid mt-5 bg-dark p-5 text-center"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <h1
          className="btn btn-info text-light"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Roboto Mono, monospace",
          }}
        >
          Contact Us?
        </h1>
        <h2
          className="text-light mt-3"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            fontFamily: "Roboto Mono, monospace",
          }}
        >
          Copy Rights@2020
        </h2>
      </div>
    </div>
  );
};

export default Base;
