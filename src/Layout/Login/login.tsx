import { notification } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/authApi";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { ADMIN_ROUTER_PATH, CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import "./login.scss";

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async () => {
    try {
      setLoading(true);
      const PhoneNumber = form.getFieldValue("phone");
      const Password = form.getFieldValue("password");
      const response = await login(PhoneNumber, Password);

      if (response) {
        if (response?.user?.isAdmin) {
          navigate(ADMIN_ROUTER_PATH.ADMIN);
        } else {
          navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
        }
        notification.open({
          message: "Thông báo!",
          description: "Đăng nhập thành công.",
          placement: "topRight",
          showProgress: true,
          pauseOnHover: true,
          style: {
            backgroundColor: "#ffffff",
            borderLeft: "4px solid #007bff",
          },
        });
      }
    } catch (error: any) {
      notification.open({
        message: "Thông báo!",
        description: "Đăng nhập thất bại.",
        placement: "topRight",
        showProgress: true,
        pauseOnHover: true,
        style: {
          backgroundColor: "#ffffff",
          borderLeft: "4px solid #007bff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate(CUSTOMER_ROUTER_PATH.FORGOT_EMAIL_INPUT);
  };

  const handleRegister = () => {
    navigate(CUSTOMER_ROUTER_PATH.SIGN_UP);
  };

  return (
    <div className="login">
      <div>
        <LogoForm />
      </div>
      <div className="login_form">
        <FormWrap onFinish={onFinish} form={form} className="login_form-wrap">
          <div className="login_form-header">
            <p className="login_form-header-content">ĐĂNG NHẬP</p>
          </div>
          <div className="login_form-phone">
            <p className="login_form-label">Số điện thoại</p>
            <FormInput
              name={"phone"}
              formItemProps={{
                className: "login_form-input",
                rules: ValidateLibrary().phone,
              }}
              inputProps={{
                placeholder: "SĐT: 0123456789",
              }}
            />
          </div>
          <div className="login_form-password">
            <div className="login_form-password-title">
              <span className="login_form-label">Mật khẩu</span>
              <span
                onClick={handleForgotPassword}
                className="login_form-password-title-forgot"
              >
                Quên mật khẩu
              </span>
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "login_form-input",
                rules: ValidateLibrary().password,
              }}
              isPassword
              inputProps={{
                placeholder: "Mật khẩu",
              }}
            />
          </div>
          <div className="login_form-login">
            <FormButtonSubmit
              content="Đăng nhập"
              buttonProps={{
                loading: loading,
                disabled: loading,
              }}
            />
          </div>
          <div className="login_form-register">
            <p>
              Bạn chưa có tài khoản?{" "}
              <span onClick={handleRegister}>Đăng ký ngay</span>
            </p>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};

export default Login;
