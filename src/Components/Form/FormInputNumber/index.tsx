import { Form, FormItemProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { ReactNode } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import './formInputNumber.scss';

type Props = {
  name: NamePath;
  label?: ReactNode | string;
  formItemProps?: FormItemProps;
  numericFormatProps?: NumericFormatProps;
  prefix?: ReactNode | string;
  suffix?: ReactNode | string;
  prefixInsideInput?: string;
  classNameFormInputNumber?: string;
  rootClassNameFormInputNumber?: string;
};

export const FormInputNumber: React.FC<Props> = ({
  numericFormatProps,
  formItemProps,
  prefix,
  prefixInsideInput,
  suffix,
  name,
  label,
  classNameFormInputNumber,
  rootClassNameFormInputNumber,
}) => {
  return (
    <div
      className={`from-number-input__item-container ${
        numericFormatProps?.disabled ? 'from-number-input__item-container-read-only' : ''
      } ${rootClassNameFormInputNumber || ''}`}
    >
      {label ? (
        <label htmlFor={name} className="p-b-8 from-number-input__item-container-label">
          {label}
          {formItemProps?.required ? <span className="from-number-input__item-label">*</span> : ''}
        </label>
      ) : (
        <></>
      )}
      <div className={`from-number-input__item-number ${classNameFormInputNumber ?? ''}`}>
        {prefix ? <div className="from-number-input__item-number-prefix">{prefix}</div> : <></>}
        <Form.Item
          name={name}
          {...formItemProps}
          className={`w-100 ${
            numericFormatProps?.disabled ? 'from-number-input__item-number-disabled' : ''
          } ${formItemProps?.className ?? ''} ${
            prefix && suffix
              ? 'from-number-input__item-number-with-icon'
              : `${
                  prefix
                    ? 'from-number-input__item-number-with-prefix'
                    : 'from-number-input__item-number-with-out-prefix'
                } ${
                  suffix
                    ? 'from-number-input__item-number-with-suffix'
                    : 'from-number-input__item-number-with-out-suffix'
                }`
          }`}
        >
          <NumericFormat
            allowNegative={false}
            decimalScale={2}
            thousandsGroupStyle={'thousand'}
            thousandSeparator={','}
            autoComplete="off"
            {...numericFormatProps}
            min={0}
            max={999_999_999}
            prefix={prefixInsideInput}
            // disabled={disabled}
            isAllowed={({ floatValue, value }) => {
              if (!value || (!floatValue && floatValue !== 0)) {
                return true;
              }
              if (
                numericFormatProps?.maxLength &&
                (value.length > numericFormatProps?.maxLength || `${floatValue}`.length > numericFormatProps?.maxLength)
              ) {
                return false;
              }
              if (numericFormatProps?.max && +floatValue > +numericFormatProps.max) {
                return false;
              }
              if (numericFormatProps?.min && +floatValue < +numericFormatProps.min) {
                return false;
              }
              return true;
            }}
          />
        </Form.Item>
        {suffix ? <div className="from-number-input__item-number-suffix">{suffix}</div> : <></>}
      </div>
    </div>
  );
};
