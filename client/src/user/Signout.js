import React, { useEffect, useState } from "react";
import { signout } from "../auth/helper";
import { Redirect } from "react-router-dom";

const Signout = () => {
  const [isSignout, setIsSignout] = useState(false);
  useEffect(() => {
    signout(() => {
      setIsSignout(true);
    }).then((data) => {
      //console.log(data);
    });
  }, []);
  return (
    <div className="container text-center">
      {isSignout ? <Redirect to="/" /> : <h2>Please Wait</h2>}
    </div>
  );
};

export default Signout;
