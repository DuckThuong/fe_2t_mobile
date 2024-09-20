import { Image } from "antd";
import "./signin.scss";
import FormWrap from "../../Components/Form/FormWrap";
import { FormInput } from "../../Components/Form/FormInput";
import { CustomButton } from "../../Components/buttons/CustomButton";
import { Link } from "react-router-dom";

const ClaimAccount = () => {
  //Tự động fill email và mật khẩu đã lưu từ trang trước vào input và bắt lỗi đúng mật khẩu.\
  //Cái button bên dưới thì link trở lại về màn đăng nhập.
  return (
    <div className="signin-account">
      <div className="signin-account_logo">
        <Image
          src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg"
          className="signin-account_logo_image"
        />
        <p className="signin-account_logo_title">セラーセントラル</p>
      </div>
      <div className="signin-account_form">
        <FormWrap className="signin-account_form-wrap">
          <div className="signin-account_form-header">
            <p className="signin-account_form-header-content">
              アカウントを作成
            </p>
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">氏名</p>
            <FormInput
              name={"name"}
              formItemProps={{
                className: "signin-account_form-input-name",
              }}
              inputProps={{
                placeholder: "氏名",
              }}
            />
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">
              <b>Eメールアドレス</b>
            </p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-email",
              }}
              inputProps={{
                placeholder: "Eメールアドレス",
              }}
            />
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">パスワード</p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-password",
              }}
              inputProps={{
                placeholder: "パスワード",
              }}
            />
            <p className="signin-account_form-icon">
              <a href="/">! </a>パスワードは最低6文字ありますか？
            </p>
          </div>
          <div className="signin-account_form-input">
            <p className="signin-account_form-label">
              もう一度パスワードを入力してください
            </p>
            <FormInput
              name={"email"}
              formItemProps={{
                className: "signin-account_form-input-confirm",
              }}
            />
          </div>

          <div className="signin-account_form-button">
            <CustomButton
              content="登録する"
              buttonProps={{
                className: "signin-account_form-button-submit",
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
          <hr className="signin-account_form-hr"></hr>
          <div className="signin-account_form-footer">
            <p>
              すでにアカウントをお持ちですか?  <a href="/">次へ</a>
            </p>
          </div>
        </FormWrap>
      </div>
    </div>
  );
};
export default ClaimAccount;
