import { Rule } from 'antd/lib/form';
import { IntlShape } from 'react-intl';
import { _validator } from './validator.validate';

interface Validate {
  [key: string]: Rule[];
}

export const ValidateLibrary: (intl: IntlShape, _option?: any[], data?: unknown) => Validate = (
  intl,
  _option?,
  data?,
) => {
  if (!_option) {
    _option = [];
  }

  const email = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        email: intl.formatMessage({ id: 'validate.email' }),
      }),
    },
    ..._option,
  ];

  const password = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        password: intl.formatMessage({ id: 'validate.password' }),
      }),
    },
    ..._option,
  ];

  const required = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
      }),
    },
    ..._option,
  ];
  const space = [
    {
      validator: _validator({
        space: intl.formatMessage({ id: 'validate.space' }),
        required: intl.formatMessage({ id: 'validate.required' }),
      }),
    },
    ..._option,
  ];
  const userName = [
    {
      validator: _validator({
        space: intl.formatMessage({ id: 'validate.space' }),
        required: intl.formatMessage({ id: 'validate.required' }),
      }),
    },
    ..._option,
  ];

  const phone = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        phone: intl.formatMessage({ id: 'validate.phone' }),
      }),
    },
    ..._option,
  ];

  const postCode = [
    {
      validator: _validator({
        postCode: intl.formatMessage({ id: 'validate.postcode' }),
      }),
    },
    ..._option,
  ];

  const passport = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        number: intl.formatMessage({ id: 'validate.number' }),
      }),
    },
    ..._option,
  ];

  const number = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        number: intl.formatMessage({ id: 'validate.number' }),
      }),
    },
    ..._option,
  ];

  const cardNumber = [
    {
      validator: _validator({
        required: intl.formatMessage({ id: 'validate.required' }),
        number: intl.formatMessage({ id: 'validate.card' }),
      }),
    },
    ..._option,
  ];
  const expirationDate = [
    {
      validator: _validator(
        {
          required: intl.formatMessage({ id: 'validate.required' }),
          expirationDate: intl.formatMessage({ id: 'validate.expirationDate' }),
        },
        data,
      ),
    },
  ];
  const dob = [
    {
      validator: _validator(
        {
          required: intl.formatMessage({ id: 'validate.required' }),
          dob: intl.formatMessage({ id: 'validate.dob' }),
        },
        data,
      ),
    },
  ];

  return {
    email,
    password,
    required,
    postCode,
    phone,
    number,
    userName,
    passport,
    cardNumber,
    dob,
    space,
    expirationDate,
  };
};
