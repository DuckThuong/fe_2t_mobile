import { Route, Routes } from "react-router-dom";
import AdminPage from "../Layout/AdminPage/AdminPage";
import Dashboard from "../Layout/AdminPage/Dashboard/Dashboard";
import ProductList from "../Layout/AdminPage/ProductList/ProductList";
import EditProduct from "../Layout/AdminPage/ProductList/EditProduct/EditProduct"; // Import EditProduct
import Orders from "../Layout/AdminPage/InvoiceList/InvoiceList";
import UsersList from "../Layout/AdminPage/UserList/UserList";
import UserDetail from "../Layout/AdminPage/UserList/UserDetail/UserDetail";
import ProviderList from "../Layout/AdminPage/ProviderList/ProviderList";
import AddBill_Client from "../Layout/AdminPage/addbill_client/index";
import AddBillProvider from "../Layout/AdminPage/AddBillProvider/AddBillProvider";
import PromotionList from "../Layout/AdminPage/PromotionList/PromotionList";
import CustomerInvoiceDetail from "../Layout/AdminPage/InvoiceList/CustomerInvoiceDetail/CustomerInvoiceDetail";
import ProviderInvoiceDetail from "../Layout/AdminPage/InvoiceList/ProviderInvoiceDetail/ProviderInvoiceDetail";
import AddPromotion from "../Layout/AdminPage/PromotionList/AddPromotion/AddPromotion";
import EditPromotion from "../Layout/AdminPage/PromotionList/EditPromotion/EditPromotion";
import { AddBillClient } from "../Layout/AdminPage/AddBillClient";

export const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminPage />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-list" element={<UsersList />} />
        <Route path="user-list/user-detail/:id" element={<UserDetail />} />
        <Route path="provider-list" element={<ProviderList />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="product-list/edit-product/:id" element={<EditProduct />} />
        <Route path="order" element={<Orders />} />
        <Route
          path="order/customer-invoice-detail/:id"
          element={<CustomerInvoiceDetail />}
        />
        <Route
          path="order/provider-invoice-detail/:id"
          element={<ProviderInvoiceDetail />}
        />
        {/* <Route path="add-bill-client" element={<AddBill_Client />} /> */}
        <Route path="add-bill-client" element={<AddBillClient />} />
        <Route path="add-bill-provider" element={<AddBillProvider />} />
        <Route path="promotion-list" element={<PromotionList />} />
        <Route path="promotion-list/add-promotion" element={<AddPromotion />} />
        <Route
          path="promotion-list/edit-promotion/:id"
          element={<EditPromotion />}
        />
      </Route>
    </Routes>
  );
};
