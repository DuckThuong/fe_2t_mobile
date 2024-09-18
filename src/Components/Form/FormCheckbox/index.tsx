import { Checkbox, CheckboxProps, Form, FormItemProps, Tooltip } from 'antd';
import React, { ReactNode } from 'react';
import './formCheckbox.scss';
import { NamePath } from 'antd/es/form/interface';

interface ITooltip {
  trigger: 'hover' | 'focus' | 'click' | 'contextMenu';
  title: React.ReactNode;
  className?: string;
}

type Props = {
  name: NamePath;
  label?: string;
  formItemProps?: FormItemProps;
  checkboxProps?: CheckboxProps;
  content?: ReactNode | string;
  labelClassName?: string;
  tooltip?: ITooltip;
};

export const FormCheckbox: React.FC<Props> = ({ ...props }) => {
  const { checkboxProps, formItemProps, name, label, content, labelClassName } = props;
  return (
    <Form.Item
      name={name}
      label={label}
      valuePropName="checked"
      {...formItemProps}
      className={`form__checkbox ${formItemProps?.className ?? ''}`}
    >
      <Checkbox {...checkboxProps}>
        <span className={`form__checkbox-title ${labelClassName ?? ''}`}>{content ?? ''}</span>
      </Checkbox>
    </Form.Item>
  );
};
