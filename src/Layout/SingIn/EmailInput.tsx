import { Image } from "antd";
import "./signin.scss";
import { Link } from "react-router-dom";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
const EmailInput = () => {
  //Nhập email vào input và lưu được email lại để truyền sang trang tiếp theo.
  return (
    <div className="signin-email">
      <div className="signin-email_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="signin-email_logo-image"
        />
        <p className="signin-email_logo-title">セラーセントラル</p>
      </div>
      <div className="signin-email_form">
        <FormWrap className="signin-email_form-wrap">
          <div className="signin-email_form-header">
            <p className="signin-email_form-header-content">アカウントを作成</p>
          </div>
          <div className="signin-email-form-email">
            <p className="signin-email_form-label">Eメールアドレス</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-email_form-email-input",
              }}
            />
          </div>

          <div className="signin-email_form-button">
            <CustomButton
              content="登録する"
              buttonProps={{
                className: "signin-email_form-button-submit",
              }}
            />
          </div>
          <div className="signin-email_form-privacy">
            <span className="signin-email_form-footer">●●●の</span>
            <Link className="signin-email_form-privacy-link" to={"/"}>
              利用規約
            </Link>
            <span>と</span>
            <Link className="signin-email_form-privacy-link" to={"/"}>
              プライバシー規約に同意
            </Link>
            <span className="signin-email_form-footer">いただける場</span>
            <span className="signin-email_form-footer">
              合はログインしてください。
            </span>
          </div>
          <div className="signin-email_form-border-top"></div>
          <span className="signin-email_form-footer">
            すでにアカウントをお持ちですか? <Link to={"/"} className="signin-email_form-footer-link">次へ</Link>
          </span>
        </FormWrap>
      </div>
    </div>
  );
};
export default EmailInput;
