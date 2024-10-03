import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { getAccount } from "../../account";
import { useForm } from "antd/es/form/Form";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { useEffect, useState } from "react";
import NotificationLabel from "../Notification";
const Login = () => {
  const [form] = useForm();
  const admin = getAccount("admin");
  const navigate = useNavigate();
  
  const onFinish = () => {
    if (
      form.getFieldValue("email") === admin?.email &&
      form.getFieldValue("password") === admin?.password
    ) {
      navigate(CUSTOMER_ROUTER_PATH.EMAIL_INPUT);
    } else {
    }
  };

  const handleForgotPassword = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onFinish();
    }
  };

  return (
    <div className="login">
      <NotificationLabel
        message="Sai tài khoản hoặc mật khẩu"
        type={"success"}
      />
      <div>
        <LogoForm />
      </div>
      <div className="login_form">
        <FormWrap onFinish={onFinish} form={form} className="login_form-wrap">
          <div className="login_form-header">
            <p className="login_form-header-content">LOGIN</p>
          </div>
          <div className="login_form-email">
            <p className="login_form-label">Email Address</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "login_form-input",
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
              }}
            />
          </div>
          <div className="login_form-password">
            <div className="login_form-password-title">
              <span className="login_form-label">Password </span>
              <span
                onClick={handleForgotPassword}
                className="login_form-password-title-forgot"
              >
                Forgot password
              </span>
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "login_form-input",
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
              }}
            />
          </div>

          <div className="login_form-login">
            <CustomButton
              content="Login"
              buttonProps={{
                className: "login_form-login-button",
              }}
            />
          </div>

          <div className="login_form-privacy">
            <span>●●● of </span>
            <Link className="login_form-privacy-link" to={"/"}>
              Terms of service
            </Link>
            <span> and </span>
            <Link className="login_form-privacy-link" to={"/"}>
              I agree to the privacy terms.
            </Link>
            <span> Place where you can get it. </span>
            <span>If so, please log in.</span>
          </div>

          <div className="login_form-checkbox ">
            <FormCheckbox
              name={"submit"}
              content={"Stay logged in"}
              formItemProps={{
                className: "login_form-checkbox-sumit",
              }}
            />
          </div>

          {/* <div className="login_form-signIn">
            <CustomButton
              content="Register Now"
              buttonProps={{
                className: "login_form-signIn-button",
                onFinish: handleRegister,
              }}
            />
          </div> */}
        </FormWrap>
      </div>
    </div>
  );
};
export default Login;
