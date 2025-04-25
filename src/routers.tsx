import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomerRouter } from "./Routers/customerRouters";
import React from "react";
import { AdminRouters } from "./Routers/adminRouters";
const RoutesApp = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* Route khách hàng */}
      <Route path="/*" element={<CustomerRouter />} />

      {/* Route Admin */}
      <Route path="/admin/*" element={<AdminRouters />} /> 
    </Routes>
  </BrowserRouter>
  );
};

export default RoutesApp;
