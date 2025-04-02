import { Route, Routes } from "react-router-dom";
import AdminPage from "../Layout/AdminPage/AdminPage";
import Dashboard from "../Layout/AdminPage/Dashboard/Dashboard";
import ProductList from "../Layout/AdminPage/ProductList/ProductList";
import AdminUpdatePhone from "../Components/AdminUpdatePhone/AdminupdatePhone";
import Orders from "../Layout/AdminPage/InvoiceList/InvoiceList";

export const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminPage />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-list/add-product" element={<AdminUpdatePhone />} />
        <Route path="product-list/edit-product" element={<AdminUpdatePhone />} />
        <Route path="order" element={<Orders />} />
        {/* <Route path="product-detail" element={<ProductDetail />} /> */}
      </Route>
    </Routes>
  );
};
