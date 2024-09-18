import { Form, FormItemProps, Input, InputProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { InputRef, PasswordProps } from 'antd/es/input';
import React, { ReactNode } from 'react';
import './formInputSearch.scss';
import { SvgSearch } from '../../@svg/SvgSearch';

type Props = {
  name: NamePath;
  label?: string | ReactNode;
  formItemProps?: FormItemProps;
  inputProps?:
    | (InputProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | (PasswordProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | undefined;
  isPassword?: boolean;
  isShowIcon?: boolean;
};

export const FormInputSearch: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, inputProps, isPassword, isShowIcon } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`form__input-search ${formItemProps?.className ?? ''} ${
        inputProps?.disabled ? 'form__input-search-read-only' : ''
      }`}
    >
      {!isPassword ? (
        <Input
          ref={inputProps?.ref}
          autoComplete="off"
          maxLength={255}
          {...inputProps}
          prefix={isShowIcon ? <SvgSearch /> : undefined}
        />
      ) : (
        <Input.Password ref={inputProps?.ref} autoComplete="off" maxLength={255} {...inputProps} />
      )}
    </Form.Item>
  );
};
