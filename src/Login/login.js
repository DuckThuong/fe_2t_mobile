import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { Checkbox } from "antd";
import React from "react";
// import './login.scss'
import './login.scss'
const options = [
    { label: 'ログインしたままにする', value: '1' },
   
  ];

const Login = () =>{
  //Bấm click vào nút đăng kí -> nhảy được sang màn đăng kí.
    return(
        <div className="login">
            <div className="login_logo">
                <Image  src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg" 
                 className="login_logo_image"/>
                <p className="login_logo_title">ログイン</p>
            </div>
            <div className="login_form">
                <Form className="login_form-wrap">
                
                    <div className="login_form-header">
                        <p className="login_form-header-content">ログイン</p>

                    </div>
                    {/* <div className="login_form-title">
                        <p className="login_form-title-content">Eメールまたは携帯電話番号 <br/>
                             <a href="/">Eメール@gmail.com</a> に送信しました <a href="/">(宛先を変更する)</a> </p>
                        
                    </div> */}
                    <div className="login-form-email">
                        <p className="login_form-email-label">Eメールまたは携帯電話番号</p>
                        <Input className="login_form-email-input" placeholder="Eメールまたは携帯電話番号"/>
                       
                    </div>
                    <div className="login-form-pw">
                        <p className="login_form-pw-label">パスワード</p>
                        <Input className="login_form-pw-input" placeholder="パスワード"/>
                       
                    </div>
               
                    <div className="login_form-login">
                        
                        <Button  className="login_form-login-btn">ログイン</Button>
                    </div>
                 
                    <p className="login_form-p1">
                    ●●●の<a>利用規約</a>と<a>プライバシー規約に同意</a>いただける場<br/>
                    合はログインしてください。
                        
                    </p>
                    <Checkbox.Group className="login_form-cb"
                        options={options}
                 
                    />
                    <div className="login_form-btnlogin">
                        
                        <Button  className="login_form-btnlogin-btn">今すぐ、ご登録ください。</Button>
                    </div>
                    
                    
                    
                </Form>
            </div>
        </div>
    )
};
export default Login;