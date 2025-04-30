
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { useNavigate } from "react-router-dom";
import { FormButtonSubmit } from "../../Components/Form/FormButtonSubmit";
import { FormInput } from "../../Components/Form/FormInput";
import FormWrap from "../../Components/Form/FormWrap";
import { LogoForm } from "../../Components/LogoForm/LogoForm";
import { ValidateLibrary } from "../../validate";
import "./signup.scss";
import Password from "antd/es/input/Password";
import { _validator } from "../../validate/validator.validate";
import axios from "axios";

 const Signup = () => {
    const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const submit = async () => {
  try {
    // validateFields sẽ kiểm tra các rules trước khi trả dữ liệu
    const values = await form.validateFields();

    const payload = {
      userName: values.email.split('@')[0], // hoặc tạo thêm field userName trong form nếu cần
      address: "ha tinh",
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
    };

    const res = await axios.post("https://t2-mobile.vercel.app/v1/auth/register", payload);

    setNotification({ message: "Đăng ký thành công!", type: "success" });
    navigate("/login"); // chuyển sang trang login nếu thành công
  } catch (error) {
    setNotification({ message: "Đăng ký thất bại!", type: "error" });
    console.error("Đăng ký lỗi: ", error);
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

 

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // onFinish();
    }
  };


  return(
     <div className="signup">
      <div>
        <LogoForm />
      </div>
      <div className="signup_form">
        <FormWrap  form={form} className="signup_form-wrap">
          <div className="signup_form-header">
            <p className="signup_form-header-content">ĐĂNG KÝ</p>
          </div>
          <div className="signup_form-email">
            <p className="signup_form-label">Email</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().email,
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Email@gmail.com",
              }}
            />
          </div>
          <div className="signup_form-phone">
            <p className="signup_form-label">Phone Number</p>
            <FormInput
              name={"phone"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().phone,
              }}
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Số điện thoại",
              }}
            />
          </div>
          <div className="signup_form-password">
            <div className="signup_form-password-title">
              <span className="signup_form-label">Mật khẩu</span>
            
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "signup_form-input",
                rules: ValidateLibrary().password,
              }}
              isPassword
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Mật khẩu",
              }}
            />
          </div>
          <div className="signup_form-password">
            <div className="signup_form-password-title">
              <span className="signup_form-label">Nhập lại mật khẩu</span>
            
            </div>
            <FormInput
              name={"CF_password"}
              formItemProps={{
                className: "signup_form-input",
                dependencies: ['password'], // 👈 theo dõi password
            
                  // rules: ValidateLibrary([], { password: form.getFieldValue('password') }).confirmPassword,

              }}
     
              isPassword
              inputProps={{
                onKeyPress: handleKeyPress,
                placeholder: "Nhập lại mật khẩu",
              }}
            />
          </div>

          <div className="signup_form-signup">
            <FormButtonSubmit 
              content="Đăng Ký"
              buttonProps={{
                className: "signup_form-signup-button",
                 onClick: submit,
                type: "default",
              }}
            />
          </div>

          
        </FormWrap>
      </div>
    </div>
  );

 };

export default Signup;
