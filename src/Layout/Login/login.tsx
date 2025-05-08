import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const auth = useSelector(selectAuth);
  console.log("ID người dùng:", auth.id);
  console.log("Email:", auth.email);
  console.log("Họ tên:", auth.fullName);

  useEffect(() => {
    if (auth && auth.id) {
      const checkAdminStatus = async () => {
        try {
          const userResponse = await userApi.getUserAdminCheck(auth.id);
          console.log("User Response:", userResponse); // Log toàn bộ dữ liệu trả về
          console.log("is_admin value:", userResponse?.is_admin); // Log giá trị is_admin

          // Kiểm tra is_admin với cả 1/true
          const isAdmin = userResponse?.isAdmin === true;
          if (isAdmin) {
            navigate(ADMIN_ROUTER_PATH.ADMIN, { replace: true });
          } else {
            navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true });
            console.error("Error fetching user admin status:111111111111111");
          }
        } catch (error) {
          console.error("Error fetching user admin status:", error);
          navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true });
        }
      };

      checkAdminStatus();
    }
  }, [auth, navigate]);

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
        dispatch(setAuthUser(userData));

        console.log("Dispatched authUser:", userData);

        setNotification({
          message: "Đăng nhập thành công!",
          type: "success",
        });

        // Gọi API để kiểm tra is_admin
        const userResponse = await userApi.getUserAdminCheck(id);
        console.log("User Response (onFinish):", userResponse); // Log dữ liệu trả về
        console.log("is_admin value (onFinish):", userResponse?.is_admin); // Log giá trị is_admin

        // Kiểm tra is_admin với cả 1/true
        const isAdmin = userResponse?.is_admin === 1 || userResponse?.is_admin === true;
        if (isAdmin) {
          setTimeout(() => navigate(ADMIN_ROUTER_PATH.DASHBOARD, { replace: true }), 1500);
        } else {
          setTimeout(() => navigate(CUSTOMER_ROUTER_PATH.TRANG_CHU, { replace: true }), 1500);
        }
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