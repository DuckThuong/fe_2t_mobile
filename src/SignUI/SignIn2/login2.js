import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Checkbox } from "antd";
import React from "react";
import "./login2.scss";

const SignIn2 = () => {
  return (
    <div className="login2">
      <div className="login2_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="login2_logo_image"
        />
        <p className="login2_logo_title">セラーセントラル</p>
      </div>
      <div className="login2_form">
        <Form className="login2_form-wrap">
          <div className="login2_form-header">
            <p className="login2_form-header-content">Eメールアドレスの確認</p>
          </div>
          <div className="login2_form-title">
            <p className="login2_form-title-content">
              メールアドレスを確認するために一時パスワードを <br />
              <a href="/">Eメール@gmail.com</a> に送信しました{" "}
              <a href="/">(宛先を変更する)</a>{" "}
            </p>
          </div>
          <div className="login2-form-email">
            <p className="login2_form-email-label">
              一時パスワードを入力してください
            </p>
            <Input className="login2_form-email-input" />
          </div>

          <div className="login2_form-login2">
            <Button className="login2_form-login2-btn">アカウントの作成</Button>
          </div>
          <p className="login2_form-p1">
            ログインすることにより、 当社の<a href="/">利用規約</a>および <br />
            <a href="/">プライバシー規約</a> に同意したとみなされます。
          </p>
          <div className="login2_form-div">
            <a className="login2_form-div-a1">コードを再送</a>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default SignIn2;
