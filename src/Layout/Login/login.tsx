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
import { LoginPayload } from "../../api/constants";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/authApi"; // đảm bảo đường dẫn đúng với file bạn để login()

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const loginMutate = useMutation({
    mutationFn: (data: LoginPayload) =>
      login(data.PhoneNumber, data.Password),
    onSuccess: (res) => {
      setNotification({ message: "Đăng nhập thành công!", type: "success" });
      navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU || "/trang-chu");
    },
    onError: () => {
      setNotification({
        message:
          "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.",
        type: "error",
      });
    },
  });

  const onFinish = () => {
    const data: LoginPayload = {
      PhoneNumber: form.getFieldValue("phone"),
      Password: form.getFieldValue("password"),
    };
    loginMutate.mutate(data);
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

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
        <FormWrap form={form} onFinish={onFinish} className="login_form-wrap">
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
                className: "login_form-login-button",
                type: "primary",
                htmlType: "submit",
              }}
            />
          </div>

          <div className="login_form-checkbox ">
            <FormCheckbox
              name={"submit"}
              content={"Lưu mật khẩu"}
              formItemProps={{
                className: "login_form-checkbox-sumit",
              }}
            />
          </div>

          <div className="login_form-register">
            <button
              onClick={handleRegister}
              className="login_form-register-button"
            >
              Đăng ký
            </button>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};

export default Login;
