import { Form, FormItemProps } from 'antd';

import React, { ReactNode } from 'react';
import './FormInputNumberFormat.scss';
import { PatternFormat, PatternFormatProps } from 'react-number-format';
import { NamePath } from 'antd/es/form/interface';

type Props = {
  name: NamePath;
  label?: ReactNode | string;
  isRequired?: boolean;
  formItemProps?: FormItemProps;
  patternFormat?: PatternFormatProps;
  formatType?: string;
  prefix?: ReactNode | string;
  suffix?: ReactNode | string;
};

export const FormInputNumberFormat: React.FC<Props> = ({ ...props }) => {
  const { formItemProps, patternFormat, name, label, prefix, suffix } = props;
  return (
    <div className="form-input-number__container">
      <div
        className={`form-input-number__format ${
          patternFormat?.readOnly ? 'form-input-number__format-read-only' : ''
        } ${patternFormat?.disabled ? 'form-input-number__format-disabled' : ''}`}
      >
        <Form.Item
          label={label}
          name={name}
          {...formItemProps}
          className={
            (formItemProps?.className ?? '') + (prefix || suffix ? ' form-input-number__format-with-icon' : '')
          }
        >
          {prefix ? <div className="form-input-number__format-with-icon__prefix">{prefix}</div> : <></>}
          <PatternFormat format="" /* format value here is required but DO NOT defined*/ {...patternFormat} />
          {suffix ? <div className="form-input-number__format-with-icon__suffix">{suffix}</div> : <></>}
        </Form.Item>
      </div>
    </div>
  );
};
