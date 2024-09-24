import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { Spin } from "antd/lib";
import "./index.scss";
const App = React.lazy(() => import("./App"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <Suspense
      fallback={
        <div className="isLoadding">
          <Spin className="isLoadding-spin" size="large" />
        </div>
      }
    >
      <App />
    </Suspense>
  </Provider>
);
