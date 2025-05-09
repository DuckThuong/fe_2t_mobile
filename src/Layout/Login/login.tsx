import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom"; // Thêm useLocation
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { CUSTOMER_ROUTER_PATH } from "../../Routers/Routers";
import { ADMIN_ROUTER_PATH } from "../../Routers/Routers";
import { ValidateLibrary } from "../../validate";
import NotificationPopup from "../Notification";
import "./login.scss";
import { login } from "../../api/authApi";
import { selectAuth, setAuthUser } from "../../store/authSlice";
import { RootState } from "../../store";
import { userApi } from "../../api/api";

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Khai báo useLocation
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const auth = useSelector(selectAuth);
  console.log("Auth state:", auth);

  useEffect(() => {
    if (auth && auth.id && !location.pathname.includes(ADMIN_ROUTER_PATH.ADMIN) && !location.pathname.includes(CUSTOMER_ROUTER_PATH.TRANG_CHU)) {
      const checkAdminStatus = async () => {
        try {
          const userResponse = await userApi.getUserAdminCheck(auth.id);
          console.log("User Response (useEffect):", userResponse);
          console.log("is_admin value (useEffect):", userResponse?.is_admin, typeof userResponse?.is_admin);

          const isAdmin = userResponse?.is_admin === 1 || userResponse?.is_admin === "1" || userResponse?.is_admin === true;
          if (isAdmin) {
            console.log("User là admin, chuyển hướng đến trang admin...");
            navigate(ADMIN_ROUTER_PATH.ADMIN, { replace: true });
          } else {
            console.log("User không phải admin, chuyển hướng đến trang user...");
            navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true });
          }
        } catch (error) {
          console.error("Error fetching user admin status:", error);
          navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true });
        }
      };

      checkAdminStatus();
    }
  }, [auth, navigate, location.pathname]); // Thêm location.pathname vào dependency array

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
      const PhoneNumber = form.getFieldValue("phone");
      const Password = form.getFieldValue("password");

      const response = await login(PhoneNumber, Password);

      if (response && response.user && response.token) {
        const { id, email, full_name, user_name } = response.user;
        if (!id || !email) {
          throw new Error("Dữ liệu người dùng không đầy đủ");
        }

        const userData = {
          id,
          email,
          fullName: full_name || user_name || "Unknown",
        };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('user_id', id.toString());
        localStorage.setItem('token', response.token);
        console.log("Đã lưu user, user_id, token vào localStorage:", { userData, user_id: id, token: response.token });

        dispatch(setAuthUser(userData));
        console.log("Dispatched authUser:", userData);

        setNotification({
          message: "Đăng nhập thành công!",
          type: "success",
        });
      } else {
        throw new Error("Phản hồi API không hợp lệ");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        (error.message === "No token in response"
          ? "Không nhận được token từ server"
          : "Đăng nhập thất bại. Vui lòng thử lại!");
      setNotification({
        message: errorMessage,
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