import { Route, Routes } from "react-router-dom";
import AdminPage from "../Layout/AdminPage/AdminPage";
import Dashboard from "../Layout/AdminPage/Dashboard/Dashboard";
import ProductList from "../Layout/AdminPage/ProductList/ProductList";
import AdminUpdatePhone from "../Components/AdminUpdatePhone/AdminupdatePhone";
import Orders from "../Layout/AdminPage/InvoiceList/InvoiceList";
import SupplierList from "../Layout/AdminPage/ProviderList/ProviderList";

import AddBill_Client from "../Layout/AdminPage/addbill_client/index";

export const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminPage />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="supplier-list" element={<SupplierList />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-list/add-product" element={<AdminUpdatePhone />} />
        <Route path="product-list/edit-product" element={<AdminUpdatePhone />} />
        <Route path="order" element={<Orders />} />
        <Route path="add-bill-client" element={<AddBill_Client/>}/>
   

  
        {/* <Route path="product-detail" element={<ProductDetail />} /> */}
      </Route>
    </Routes>
  );
};
