import { Form, FormItemProps, Radio, RadioGroupProps, RadioChangeEvent } from 'antd';
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
  options: Option[];
  formItemProps?: FormItemProps;
  formRadioGroupProps?: RadioGroupProps;
  radioProps?: RadioProps;
  isCol?: boolean;
  onChange?: (e: RadioChangeEvent) => void; // Correct type for onChange
};

export const FormRadio: React.FC<Props> = ({ ...props }) => {
  const { name, label, formRadioGroupProps, options, formItemProps, radioProps, isCol, onChange } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      {...formItemProps}
      className={`radio__form-radio ${formItemProps?.className ?? ''}`}
    >
      <Radio.Group {...formRadioGroupProps} className={isCol ? 'radio__form-column' : ''} onChange={onChange}>
        {options.map((item) => (
          <Radio
            value={item.value}
            key={item.value}
            disabled={formRadioGroupProps?.disabled || item.disabled}
            {...radioProps}
          >
            {item.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
