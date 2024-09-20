import { Image } from "antd";
import "./login.scss";
import { Link } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { FormCheckbox } from "../../Components/Form/FormCheckbox";

const Login = () => {
  return (
    <div className="login">
      <div className="login_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="login_logo_image"
        />
        <p className="login_logo_title">ログイン</p>
      </div>
      <div className="login_form">
        <FormWrap className="login_form-wrap">
          <div className="login_form-header">
            <p className="login_form-header-content">ログイン</p>
          </div>
          <div className="login_form-email">
            <p className="login_form-label">Eメールまたは携帯電話番号</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "login_form-input",
              }}
            />
          </div>
          <div className="login_form-password">
            <div className="login_form-password-title">
              <span className="login_form-label">パスワード </span>
              <span className="login_form-password-title-forgot">パスワードを忘れた場合</span>
            </div>
            <FormInput
              name={"password"}
              formItemProps={{
                className: "login_form-input",
              }}
            />
          </div>

          <div className="login_form-login">
            <CustomButton
              content="ログイン"
              buttonProps={{
                className: "login_form-login-button",
              }}
            />
          </div>

          <div className="login_form-privacy">
            <span>●●●の</span>
            <Link className="login_form-privacy-link" to={"/"}>
              利用規約
            </Link>
            <span>と</span>
            <Link className="login_form-privacy-link" to={"/"}>
              プライバシー規約に同意
            </Link>
            <span>いただける場</span>
            <span>合はログインしてください。</span>
          </div>

          <div className="login_form-checkbox ">
            <FormCheckbox
              name={"submit"}
              content={"ログインしたままにする"}
              formItemProps={{
                className: "login_form-checkbox-sumit",
              }}
            />
          </div>

          <div className="login_form-signIn">
            <CustomButton
              content="今すぐ、ご登録ください。"
              buttonProps={{
                className: "login_form-signIn-button",
              }}
            />
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default Login;
