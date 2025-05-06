import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../Notification";
import "./login.scss";
import { login } from "../../api/authApi";
import { setAuthUser } from "../../store/authSlice";
import { message } from "antd";

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const onFinish = async () => {
    try {
      setLoading(true);
      const phone = form.getFieldValue("phone");
      const password = form.getFieldValue("password");

      const response = await login(phone, password);

      if (response && response.user) {
        dispatch(
          setAuthUser({
            id: response.user.id,
            email: response.user.email,
            fullName: response.user.full_name || response.user.user_name,
          })
        );

        setNotification({
          message: "Đăng nhập thành công!",
          type: "success",
        });

        // Wait a bit before navigating to show the success message
        setTimeout(() => {
          navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
        }, 1000);
      }
    } catch (error: any) {
      setNotification({
        message:
          error.response?.data?.message ||
          "Đăng nhập thất bại. Vui lòng thử lại!",
        type: "error",
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
      <NotificationPopup
        message={notification?.message}
        type={notification?.type}
      />
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
