import React from "react";
import ReactDOM from "react-dom/client";

import SignIn from "./SignUI/SingIn/login";
import SignIn2 from "./SignUI/SignIn2/login2";
import SignIn3 from "./SignUI/SignIn3/login3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SignIn3 />
  </React.StrictMode>
);
