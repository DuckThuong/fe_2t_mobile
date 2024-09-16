import React from "react";
import ReactDOM from "react-dom/client";

// import reportWebVitals from "./reportWebVitals";
import SignIn from "./SignUI/SingIn/signin";
import SignIn2 from "./SignUI/SignIn2/signin2";
import SignIn3 from "./SignUI/SignIn3/signin3";
import Login from "./Login/login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Login/>
  </React.StrictMode>
);
// reportWebVitals();
