import { Route, Routes } from "react-router-dom";
import AdminPage from "../Layout/AdminPage/AdminPage";
import Dashboard from "../Layout/AdminPage/Dashboard/Dashboard";
import ProductList from "../Layout/AdminPage/ProductList/ProductList";
import AdminUpdatePhone from "../Components/AdminUpdatePhone/AdminupdatePhone";
import Orders from "../Layout/AdminPage/InvoiceList/InvoiceList";
import UsersList from "../Layout/AdminPage/UserList/UserList";
import UserDetail from "../Layout/AdminPage/UserList/UserDetail/UserDetail";
import ProviderAdd from "../Layout/AdminPage/ProviderList/ProviderAdd/ProviderAdd";
import ProviderEdit from "../Layout/AdminPage/ProviderList/ProviderEdit/ProviderEdit";
import ProviderList from "../Layout/AdminPage/ProviderList/ProviderList";
import EditShipment from "../Layout/AdminPage/ProductList/EditShipment/EditShipment";

import AddBill_Client from "../Layout/AdminPage/addbill_client/index";
import AddBillProvider from "../Layout/AdminPage/AddBillProvider/AddBillProvider";
import PromotionList from "../Layout/AdminPage/PromotionList/PromotionList";
import CustomerInvoiceDetail from "../Layout/AdminPage/InvoiceList/CustomerInvoiceDetail/CustomerInvoiceDetail";
import ProviderInvoiceDetail from "../Layout/AdminPage/InvoiceList/ProviderInvoiceDetail/ProviderInvoiceDetail";
import AddPromotion from "../Layout/AdminPage/PromotionList/AddPromotion/AddPromotion";
import EditPromotion from "../Layout/AdminPage/PromotionList/EditPromotion/EditPromotion";

export const AdminRouters = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminPage />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user-list" element={<UsersList />} />
        <Route path="user-list/:id" element={<UserDetail />} />
        <Route path="provider-list" element={<ProviderList />} />
        <Route path="provider-list/add-provider" element={<ProviderAdd />} />
        <Route
          path="provider-list/edit-provider/:id"
          element={<ProviderEdit />}
        />
        <Route path="product-list" element={<ProductList />} />
        <Route
          path="product-list/edit-shipment/:id"
          element={<EditShipment />}
        />
        <Route path="product-list/add-product" element={<AdminUpdatePhone />} />
        <Route
          path="product-list/edit-product"
          element={<AdminUpdatePhone />}
        />
        <Route path="order" element={<Orders />} />
        <Route
          path="order/customer-invoice-detail/:id"
          element={<CustomerInvoiceDetail />}
        />
        <Route
          path="order/provider-invoice-detail/:id"
          element={<ProviderInvoiceDetail />}
        />
        <Route path="add-bill-client" element={<AddBill_Client />} />
        <Route path="add-bill-provider" element={<AddBillProvider />} />
        <Route path="promotion-list" element={<PromotionList />} />
        <Route path="promotion-list/add-promotion" element={<AddPromotion />} />
        <Route path="promotion-list/edit-promotion/:id" element={<EditPromotion />} />

        {/* <Route path="product-detail" element={<ProductDetail />} /> */}
      </Route>
    </Routes>
  );
};
