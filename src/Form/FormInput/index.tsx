import { Form, FormItemProps, Input, InputProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { InputRef, PasswordProps } from 'antd/es/input';
import React, { ReactNode } from 'react';
import './formInput.scss';

type Props = {
  name: NamePath;
  label?: string | ReactNode;
  formItemProps?: FormItemProps;
  inputProps?:
    | (InputProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | (PasswordProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | undefined;
  isPassword?: boolean;
};

export const FormInput: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, inputProps, isPassword } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`form__input w-100 ${formItemProps?.className ?? ''} ${
        inputProps?.disabled ? 'form__input-read-only' : ''
      }`}
    >
      {!isPassword ? (
        <Input ref={inputProps?.ref} autoComplete="off" maxLength={255} {...inputProps} />
      ) : (
        <Input.Password ref={inputProps?.ref} autoComplete="off" maxLength={255} {...inputProps} />
      )}
    </Form.Item>
  );
};
