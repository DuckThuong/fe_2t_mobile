import { Button, ButtonProps, Form, FormItemProps } from 'antd';
import React, { ReactNode } from 'react';
import './formButtonSubmit.scss';

type Props = {
  label?: string;
  formItemProps?: FormItemProps;
  buttonProps?: ButtonProps;
  content: ReactNode | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Added onClick handler
};

export const FormButton: React.FC<Props> = ({ buttonProps, formItemProps, content, onClick, ...rest }) => {
  return (
    <Form.Item {...rest} {...formItemProps} className={`form-button__submit ${formItemProps?.className ?? ''}`}>
      <Button
        type="primary"
        {...buttonProps}
        className={`${buttonProps?.className ?? ''} ${buttonProps?.disabled ? 'form-button__submit-disable' : ''}`}
        onClick={onClick}
      >
        {content}
      </Button>
    </Form.Item>
  );
};
