import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Checkbox } from "antd";
import React from "react";
import "./login.scss";
const options = [{ label: "Bạn tin tôi đánh bạn không", value: "1" }];
const SignIn = () => {
  return (
    <div className="login">
      <div className="login_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="login_logo_image"
        />
        <p className="login_logo_title">セラーセントラル</p>
      </div>
      <div className="login_form">
        <Form className="login_form-wrap">
          <div className="login_form-header">
            <p className="login_form-header-content">アカウントを作成</p>
          </div>
          <div className="login-form-email">
            <p className="login_form-email-label">Eメールアドレス</p>
            <Input className="login_form-email-input" />
          </div>

          <div className="login_form-login">
            <Button className="login_form-login-btn">登録する</Button>
          </div>
          <p className="login_form-p1">
            ●●●の <a href="/">利用規約</a> と <a href="/">プライバシー規約</a>{" "}
            に同意いただける場合はログインしてください。
          </p>
          <hr className="login_form-hr"></hr>
          <p className="login_form-p2">
            すでにアカウントをお持ちですか?  <a href="/">次へ</a>
          </p>
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
