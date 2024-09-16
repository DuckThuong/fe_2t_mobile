import { Spin } from "antd";
import { random } from "lodash";
import React from "react";
import { Suspense } from "react";

export const SuspenseWrapper = (props) => {
  //Sử lý trạng thái loadding cho trang web.
  return (
    <Suspense
      key={"suspense-" + random(10)}
      fallback={
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spin size="large" />
        </div>
      }
    >
      {props.component}
    </Suspense>
  );
};
