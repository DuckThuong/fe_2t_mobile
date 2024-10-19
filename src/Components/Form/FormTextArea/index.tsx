import { Form, FormItemProps, InputProps } from "antd";
import { NamePath } from "antd/es/form/interface";
import { InputRef, PasswordProps, TextAreaProps } from "antd/es/input";
import React, { ReactNode } from "react";
import "./formTextArea.scss";
import TextArea from "antd/lib/input/TextArea";

type Props = {
  name: NamePath;
  label?: string | ReactNode;
  formItemProps?: FormItemProps;
  textAreaProps?:
    | (TextAreaProps & React.RefAttributes<InputRef | HTMLInputElement | any>)
    | undefined;
};

export const FormTextArea: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, textAreaProps } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`form__textarea w-100 ${formItemProps?.className ?? ""} ${
        textAreaProps?.disabled ? "form__textarea-read-only" : ""
      }`}
    >
      <TextArea
        ref={textAreaProps?.ref}
        autoComplete="off"
        maxLength={10000}
        {...textAreaProps}
      />
    </Form.Item>
  );
};
