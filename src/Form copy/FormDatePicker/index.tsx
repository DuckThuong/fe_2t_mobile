import { DatePicker, DatePickerProps, Form, FormItemProps } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { SvgDatePicker } from '../../@svg/SvgDatePicker';
import './datePickerCustom.scss';
import { NamePath } from 'antd/es/form/interface';
import 'dayjs/locale/ja';
import 'dayjs/locale/en';
import localeJa from 'antd/es/date-picker/locale/ja_JP';
import localeEn from 'antd/es/date-picker/locale/en_US';
import { useIntl } from 'react-intl';

type Props = {
  name: NamePath;
  label?: ReactNode;
  datePickerProps?: DatePickerProps;
  datePickerIcon?: ReactNode;
  formItemProps?: FormItemProps;
};

export const FormDatePicker: React.FC<Props> = ({ datePickerProps, datePickerIcon, name, label, formItemProps }) => {
  const { locale: intlLocale } = useIntl();
  const [locale, setLocale] = useState(localeEn);
  useEffect(() => {
    if (intlLocale === 'ja-JP') {
      setLocale(localeJa);
    } else {
      setLocale(localeEn);
    }
  }, [intlLocale]);

  return (
    <div className="form-date-picker__container">
      {label ? (
        <label htmlFor={name} className="p-b-8 form-date-picker__label-container">
          {label}
          {formItemProps?.required ? <span className="form-date-picker__label">*</span> : ''}
        </label>
      ) : (
        <></>
      )}
      <Form.Item name={name} {...formItemProps} className={`form-date-picker__item ${formItemProps?.className ?? ''}`}>
        <DatePicker
          {...datePickerProps}
          suffixIcon={datePickerIcon ?? <SvgDatePicker />}
          allowClear={false}
          locale={locale}
        />
      </Form.Item>
    </div>
  );
};
