import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import React from "react";
import "./signin.scss";
import { FormInput } from "../../../Components/Form/FormInput";
import FormWrap from "../../../Components/Form/FormWrap";
import { CustomButton } from "../../../Components/buttons/CustomButton";

const PrivacyCode = () => {
  //Lấy được email từ trang trước và lưu lại được mật khẩu và email để nhập vào trang tiếp theo.
  return (
    <div className="signin-code">
      <div className="signin-code_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="signin-code_logo_image"
        />
        <p className="signin-code_logo_title">セラーセントラル</p>
      </div>
      <div className="signin-code_form">
        <FormWrap className="signin-code_form-wrap">
          <div className="signin-code_form-header">
            <p className="signin-code_form-header-content">
              Eメールアドレスの確認
            </p>
          </div>
          <div className="signin-code_form-title">
            <p className="signin-code_form-title-content">
              メールアドレスを確認するために一時パスワードを <br />
              <a href="/">Eメール@gmail.com</a> に送信しました
              <a href="/">(宛先を変更する)</a>{" "}
            </p>
          </div>
          <div className="signin-code-form-email">
            <p className="signin-code_form-label">
              一時パスワードを入力してください
            </p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-code_form-input",
              }}
            />
          </div>

          <div className="signin-code_form-code">
            <CustomButton
              content="アカウントの作成"
              buttonProps={{
                className: "signin-code_form-button-submit",
              }}
            />
          </div>

          <div className="signin-code_form-footer">
            <p className="signin-code_form-footer-content">
              ログインすることにより、 当社の<a href="/">利用規約</a>および{" "}
              <br />
              <a href="/">プライバシー規約</a> に同意したとみなされます。
            </p>
            <CustomButton
              content="コードを再送"
              buttonProps={{
                className: "signin-code_form-footer-button",
              }}
            />
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default PrivacyCode;
