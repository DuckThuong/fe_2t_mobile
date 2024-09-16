import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CustomerRouter } from "./Routers/customerRouters";
import React from "react";
const RoutesApp = () => {
  return (
    //Hỗ trợ chuyển đổi đường dẫn lên trình duyệt
    <BrowserRouter> 
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
