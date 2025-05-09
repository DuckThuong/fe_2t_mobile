import { Form, FormItemProps, Select, SelectProps } from "antd";
import { BaseOptionType } from "antd/es/select";
import React, { ReactNode } from "react";
import "./formSelect.scss";
import { NamePath } from "antd/es/form/interface";
import { SvgSelect } from "../../@svg/SvgSelect";

type Props = {
  name: NamePath;
  label?: React.ReactNode;
  formItemProps?: FormItemProps | any;
  selectProps?: SelectProps;
  placeholder?: string;
};

export const FormSelect: React.FC<Props> = ({ ...props }) => {
  const { name, label, formItemProps, selectProps, placeholder } = props;
  return (
    <div className="form__select">
      <Form.Item
        name={name}
        label={label}
        {...formItemProps}
        className={`w-100  ${formItemProps?.className ?? ""}`}
      >
        <Select
          allowClear
          {...selectProps}
          showSearch={false}
          suffixIcon={<SvgSelect />}
          popupClassName={`form__select-popup-select ${selectProps?.popupClassName}`}
        />
      </Form.Item>
    </div>
  );
};
