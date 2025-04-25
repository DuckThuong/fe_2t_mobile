import { useQuery } from "@tanstack/react-query";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH, ADMIN_ROUTER_PATH } from "../../Routers/Routers"; // Thêm ADMIN_ROUTER_PATH
import { setAuthUser } from "../../store/authSlice";
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../Notification";
import "./login.scss";
import { login } from "../../api/authApi";

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const { data: loginApi } = useQuery({
    queryKey: [QUERY_KEY.GET_USER],
    queryFn: userApi.getAllUsers,
  });

  const users = [
    {
      phone: "0948682103",
      password: "Khanhhung1@",
      role: "client",
    },
    {
      phone: "0948682102",
      password: "Khanhhung1@",
      role: "admin",
    },
  ];

  const onFinish = () => {
    const phone = form.getFieldValue("phone");
    const password = form.getFieldValue("password");

    const userExists = loginApi?.userList?.some(
      (user) => user.Phone === phone && user.PasswordHash === password
    );
    if (userExists) {
      const userData = loginApi.userList.find((user) => user.Phone === phone);
      if (userData) {
        dispatch(
          setAuthUser({
            id: userData.UserID,
            email: userData.Email,
            fullName: userData.Username,
          })
        );

        // Điều hướng đến trang tương ứng
        if (userData.Role === "admin") {
          navigate(ADMIN_ROUTER_PATH.DASHBOARD);  // Điều hướng admin
        } else {
          navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU); // Điều hướng client
        }
      }
      login(phone, password);
      setNotification({ message: "Thành Công", type: "success" });
    } else {
      setNotification({
        message: "Sai tài khoản hoặc mật khẩu",
        type: "error",
      });
    }
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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onFinish();
    }
  };

  const handleRegister = () => {
    navigate(CUSTOMER_ROUTER_PATH.SIGN_UP); // Điều hướng đến trang đăng ký
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
                onKeyPress: handleKeyPress,
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
                onKeyPress: handleKeyPress,
                placeholder: "Mật khẩu",
              }}
            />
          </div>

          <div className="login_form-login">
            <FormButtonSubmit
              content="Đăng nhập"
              buttonProps={{
                className: "login_form-login-button",
                onClick: onFinish,
                type: "default",
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

          {/* Thêm nút đăng ký */}
          <div className="login_form-register">
            <button onClick={handleRegister} className="login_form-register-button">
              Đăng ký
            </button>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default Login;
