import React from "react";
import "./logoForm.scss";
import { Image } from "antd";

export const LogoForm: React.FC = () => {
  return (
    <div className="logo-form__container">
      <Image
        preview={false}
        width={324}
        height={140}
        className="my-auto"
        src={
          "logo.jpg"
        }
        alt={"imageFormLogin"}
      />
      <h2 className="logo-form__title text-center">2T_MOBILE</h2>
    </div>
  );
};
