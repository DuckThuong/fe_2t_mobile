import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomerRouter } from "./Routers/customerRouters";
import React from "react";
const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
