import { useQuery } from "@tanstack/react-query";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/api";
import { QUERY_KEY } from "../../api/apiConfig";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { setAuthUser } from "../../store/authSlice"; // Import action
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../Notification";
import "./login.scss";
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

  const onFinish = () => {
    const email = form.getFieldValue("email");
    const password = form.getFieldValue("password");

    const userExists = loginApi?.userList?.some(
      (user) => user.Email === email && user.PasswordHash === password
    );
    if (userExists) {
      const userData = loginApi.userList.find((user) => user.Email === email);
      if (userData) {
        dispatch(
          setAuthUser({
            id: userData.UserID,
            email: userData.Email,
            fullName: userData.Username,
          })
        );
      }

      navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU);
      setNotification({ message: "Thành Công", type: "success" });
    } else {
      setNotification({
        message: "Sai tài khoản hoặc mật khẩu",
        type: "error",
      });
      form.setFieldsValue("e");
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

  return (
    <div className="login">
      {/* <video autoPlay muted loop id="loginVideo">
        <source src="/112722-695433093.mp4" type="video/mp4" />
      </video> */}

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
          <div className="login_form-email">
            <p className="login_form-label">Email</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "login_form-input",
                rules: ValidateLibrary().email,
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Email@gmail.com",
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

          {/* <div className="login_form-privacy">
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
          </div> */}

          <div className="login_form-checkbox ">
            <FormCheckbox
              name={"submit"}
              content={"Lưu mật khẩu"}
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
