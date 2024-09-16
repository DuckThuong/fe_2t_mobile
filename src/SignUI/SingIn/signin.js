import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Checkbox } from "antd";
import React from "react";
import "./signin.scss";
const options = [{ label: "Bạn tin tôi đánh bạn không", value: "1" }];
const SignIn = () => {
  return (
    <div className="signin">
      <div className="signin_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="signin_logo_image"
        />
        <p className="signin_logo_title">セラーセントラル</p>
      </div>
      <div className="signin_form">
        <Form className="signin_form-wrap">
          <div className="signin_form-header">
            <p className="signin_form-header-content">アカウントを作成</p>
          </div>
          <div className="signin-form-email">
            <p className="signin_form-email-label">Eメールアドレス</p>
            <Input className="signin_form-email-input" />
          </div>
          {/* <div className="signin-form-pw">
                        <div className="signin_form-pw-min">
                             <p className="signin_form-pw-min-label">Mật khẩu</p>
                             <a href="/" className="signin_form-pw-min-a">Bạn quên mật khẩu</a>

                        </div>
                        
                       
                        <Input className="signin_form-input-pw" placeholder="nhập mật khẩu"/>

                    </div> */}
          <div className="signin_form-signin">
            <Button className="signin_form-signin-btn">登録する</Button>
          </div>
          <p className="signin_form-p1">
            ●●●の <a href="/">利用規約</a> と <a href="/">プライバシー規約</a>{" "}
            に同意いただける場合はログインしてください。
          </p>
          <hr className="signin_form-hr"></hr>
          <p className="signin_form-p2">
            すでにアカウントをお持ちですか?  <a href="/">次へ</a>
          </p>
          {/* <div>
                        <Checkbox.Group 
                        className="signin_form-checkbox" options={options}/>
                        
                    </div>
                    <div className="div_button_signin">
                        
                        <Button  className="btn_button-SIGNIN">SIGN IN</Button>
                    </div> */}
        </Form>
      </div>
    </div>
  );
};
export default SignIn;
