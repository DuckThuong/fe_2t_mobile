import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import React from "react";
import './login3.scss'

const SignIn3 = () =>{
    return(
        <div className="login3">
            <div className="login3_logo">
                <Image  src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg" 
                 className="login3_logo_image"/>
                <p className="login3_logo_title">セラーセントラル</p>
            </div>
            <div className="login3_form">
                <Form className="login3_form-wrap">
                
                    <div className="login3_form-header">
                        <p className="login3_form-header-content">アカウントを作成</p>

                    </div>
                    <div className="login3_form-name">
                        <p className="login3_form-name-label"><b>氏名</b></p>
                        <Input className="login3_form-name-input" placeholder="氏名"/>
                        
                    </div>
                    <div className="login3_form-email">
                        <p className="login3_form-email-label"><b>Eメールアドレス</b></p>
                        <Input className="login3_form-email-input" placeholder="Eメール@gmail.com"/>
                       
                    </div>
                    <div className="login3_form-pw">
                        <p className="login3_form-pw-label"><b>パスワード</b></p>
                        <Input className="login3_form-pw-input" placeholder="パスワード"/>
                        <p className="login3_form-pw-label2"><a href="/">!  </a>パスワードは最低6文字ありますか？</p>
                    </div>
                    <div className="login3_form-repw">
                        <p className="login3_form-repw-label"><b>もう一度パスワードを入力してください</b></p>
                        <Input className="login3_form-repw-input" />
                        
                    </div>
                    
                    
                    <div className="login3_form-login">
                        
                        <Button  className="login3_form-login-btn">登録する</Button>
                    </div>
                    <p className="login3_form-p1">
                        ●●●の <a href="/">利用規約</a> と <a href="/">プライバシー規約</a> に同意いただける場合はログインしてください。
                        
                    </p>
                    <hr className="login3_form-hr"></hr>
                    <p className="login3_form-p2">
                        すでにアカウントをお持ちですか?  <a href="/">次へ</a>
                    </p>
                   
                </Form>
            </div>
        </div>
    )
};
export default SignIn3;