import * as _ from 'lodash';
import dayjs from 'dayjs';
// import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

type Option = {
  message: string;
  min?: number;
  max?: number;
};

type validateType =
  | 'required'
  | 'email'
  | 'phone'
  | 'postCode'
  | 'password'
  | 'space'
  | 'number'
  | 'dob'
  | 'expirationDate';

type ValidatorOption = string | boolean | Option;
type Validators = { [key in validateType]?: ValidatorOption };

export const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;
export const regexPosCode = /^\d{6,}$/;
export const spaceRegex = /\s+/;
export const REGEX_PHONE_NUMBER = /^\+81\d{2}\d{4}\d{4}$/;
export const regexEmoji = /\p{Extended_Pictographic}/gu;

const getMessage = (option: ValidatorOption): string => {
  return typeof option === 'object' ? option.message : (option as string);
};

const VALIDATOR: any = {
  required: (value: string | number | undefined | null, option: ValidatorOption) => {
    if (value === undefined || value === null || value.toString().trim() === '') {
      throw new Error(getMessage(option));
    }

    const type = typeof value;
    let isValid = true;
    if (type === 'string') {
      isValid = !!(value as string).trim();
    }

    if (!isValid) {
      throw new Error(getMessage(option));
    }
  },
  password: (value: string, option: ValidatorOption) => {
    if (!value) {
      return;
    }

    const isValid = regexPass.test(value.trim());
    if (!isValid) {
      throw new Error(getMessage(option));
    }
  },

  space: (value: string, option: ValidatorOption) => {
    if (!value) {
      return;
    }
    if (spaceRegex.test(value)) {
      throw new Error(getMessage(option));
    }
  },

  email: (value: string, option: ValidatorOption) => {
    if (!value) {
      return;
    }
  },
  phone: (value: string, option: ValidatorOption) => {
    const phoneNumber = value?.replace(/[-\s]/g, '');
    if (!REGEX_PHONE_NUMBER.test(phoneNumber)) {
      throw new Error(getMessage(option));
    }
  },

  postCode: (value: string, option: Option) => {
    if (!value) {
      return;
    }

    const isValid = regexPosCode.test(value);
    if (!isValid) {
      throw new Error(getMessage(option));
    }
  },

  number: (value: string, option: Option) => {
    if (!value) {
      return;
    }

    if (isNaN(+value)) {
      throw new Error(getMessage(option));
    }
  },

  dob: (value: string, option: Option, data: { day: number; month: number; year: number }) => {
    const { day, month, year } = data;
    console.log(data);
    const selectedDate = dayjs(`${year}-${month}-${day}`);
    if (!value) {
      throw new Error(getMessage(option));
    }
    if (day) {
      if (!year) {
        return;
      } else if (month && year) {
        const today = dayjs().startOf('day');
        if (selectedDate.isAfter(dayjs(today))) {
          throw new Error(getMessage(option));
        }
      } else {
        throw new Error(getMessage(option));
      }
    } else {
      throw new Error(getMessage(option));
    }
  },
  expirationDate: (value: string, option: Option, data: { day: number; month: number; year: number }) => {
    const { day, month, year } = data;
    console.log(data);
    const selectedDate = dayjs(`${year}-${month}-${day}`);
    if (!value) {
      throw new Error(getMessage(option));
    }
    if (day) {
      if (!year) {
        return;
      } else if (month && year) {
        const today = dayjs().startOf('day');
        if (selectedDate.isBefore(dayjs(today))) {
          throw new Error(getMessage(option));
        }
      } else {
        throw new Error(getMessage(option));
      }
    } else {
      throw new Error(getMessage(option));
    }
  },
};
export const _validator = (validators: Validators, data?: unknown) => {
  return async (rule: any, text: string) => {
    _.map(validators, (options, type) => {
      options && VALIDATOR[type] && VALIDATOR[type](text, options, data);
    });
  };
};
