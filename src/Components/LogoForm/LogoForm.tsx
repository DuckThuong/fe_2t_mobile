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
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
        }
        alt={"imageFormLogin"}
      />
      <h2 className="logo-form__title text-center">REPO WEB</h2>
    </div>
  );
};
