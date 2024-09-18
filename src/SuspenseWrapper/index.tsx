import { Spin } from "antd";
import { random } from "lodash";
import React from "react";
import { Suspense } from "react";

export const SuspenseWrapper = (props) => {
  //xử lý trạng thái loading cho trang web
  return (
    <Suspense
      key={"suspense-" + random(10)}
      fallback={
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spin size="large" />
        </div>
        //mạng lag thì nó chạy vào cái cục fallback
      }
    >
      {props.component} {/* không lag thì nó chạy vào dòng này */}
      
    </Suspense>
  );
};
