import { Button, ButtonProps, Form, FormItemProps } from 'antd';
import React, { ReactNode } from 'react';
import './formButtonSubmit.scss';
type Props = {
  label?: string;
  formItemProps?: FormItemProps;
  buttonProps?: ButtonProps;
  content: ReactNode | string;
};
export const FormButtonSubmit: React.FC<Props> = ({ buttonProps, formItemProps, ...rest }) => {
  return (
    <Form.Item {...rest} {...formItemProps} className={`form-button__submit ${formItemProps?.className ?? ''}`}>
      <Button
        type="primary"
        {...buttonProps}
        htmlType={'submit'}
        className={`${buttonProps?.className ?? ''} ${buttonProps?.disabled ? 'form-button__submit-disable' : ''}`}
      >
        {rest.content}
      </Button>
    </Form.Item>
  );
};
