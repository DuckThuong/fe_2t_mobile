import { Form, FormItemProps, Radio, RadioGroupProps } from 'antd';
import React from 'react';
import './formRadio.scss';
import { RadioProps } from 'antd/lib';
import { NamePath } from 'antd/es/form/interface';

type Option = {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
};

type Props = {
  name: NamePath;
  label?: React.ReactNode;
  option?: Option;
  formItemProps?: FormItemProps;
  formRadioGroupProps?: RadioGroupProps;
  radioProps?: RadioProps;
};

export const RadioCustom: React.FC<Props> = ({ ...props }) => {
  const { name, label, formRadioGroupProps, option, formItemProps, radioProps } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`radio__custom-radio ${formItemProps?.className ?? ''}`}
    >
      <Radio
        value={option?.value}
        key={option?.value}
        disabled={formRadioGroupProps?.disabled || option?.disabled}
        {...radioProps}
      >
        {option?.label}
      </Radio>
    </Form.Item>
  );
};
