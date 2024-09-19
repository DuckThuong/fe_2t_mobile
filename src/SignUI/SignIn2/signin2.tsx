import { Image } from "antd";
import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import React from "react";
import './signin2.scss'


const signin2 = () =>{
    //Lấy được email từ trang trước và lưu lại được mật khẩu và email để nhập vào trang tiếp theo.
    return(
        <div className="signin2">
            <div className="signin2_logo">
                <Image  src="https://cafefcdn.com/thumb_w/640/203337114487263232/2022/3/23/photo1648012210921-16480122111121649082453.jpg" 
                 className="signin2_logo_image"/>
                <p className="signin2_logo_title">セラーセントラル</p>
            </div>
            <div className="signin2_form">
                <Form className="signin2_form-wrap">
                
                    <div className="signin2_form-header">
                        <p className="signin2_form-header-content">Eメールアドレスの確認</p>

                    </div>
                    <div className="signin2_form-title">
                        <p className="signin2_form-title-content">メールアドレスを確認するために一時パスワードを <br/>
                             <a href="/">Eメール@gmail.com</a> に送信しました <a href="/">(宛先を変更する)</a> </p>
                        
                    </div>
                    <div className="signin2-form-email">
                        <p className="signin2_form-email-label">一時パスワードを入力してください</p>
                        <Input className="signin2_form-email-input" />
                       
                    </div>
               
                    <div className="signin2_form-signin2">
                        
                        <Button  className="signin2_form-signin2-btn">アカウントの作成</Button>
                    </div>
                 
                    <p className="signin2_form-p1">
                        ログインすることにより、 当社の<a href="/">利用規約</a>および <br/>
                        <a href="/">プライバシー規約</a> に同意したとみなされます。
                        
                    </p>
                    <div className="signin2_form-div">
                        <a className="signin2_form-div-a1">
                            コードを再送
                        </a>
                    </div>
                    
                    
                    
                </Form>
            </div>
        </div>
    )
};
export default signin2;